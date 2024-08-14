export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { auth } from "@/lib/auth";
import { saveImage } from "@/lib/helpers";
import { toJson } from "@/lib/helpers";

// !!! -----------------------------------------------
// !!! ---------------------- GET --------------------
// !!! -----------------------------------------------

export async function GET(req: NextRequest) {
  try {
    const result = await prisma.categories.findMany({
      select: {
        categoryId: true,
        categoryName: true,
      },
    });
    const categories = toJson(result);

    return NextResponse.json({ categories, status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

// !!! -----------------------------------------------
// !!! ----------------  POST  -------------------
// !!! -----------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // * AUTH CONFIRMATION
    let session: any = await auth();
    if (!session) {
      return NextResponse.json({ message: "UnAuthorize" }, { status: 403 });
    }

    const formData = await req.formData();

    // Validate images
    const images: any = ["image1", "image2", "image3", "image4"]
      .map((key) => formData.get(key))
      .filter((image) => image !== "null");

    if (images.length === 0) {
      return NextResponse.json(
        { message: "Images are required" },
        { status: 400 }
      );
    }

    const isValidImage = (image: any) =>
      image instanceof File &&
      (image.type === "image/png" ||
        (image.type === "image/jpeg" && image.size < 4000000));

    if (!images.every(isValidImage)) {
      return NextResponse.json({ message: "InValid Image" }, { status: 400 });
    }

    // Validate details object
    const requiredFields = [
      "title",
      "description",
      "category",
      "price",
      "stock",
      "brand",
      "isFeatured",
    ];

    const details: any = Object.fromEntries(
      requiredFields.map((field) => [field, formData.get(field)])
    );

    if (Object.values(details).some((value) => !value)) {
      const missingField = requiredFields.find((field) => !details[field]);
      return NextResponse.json(
        { message: `${missingField} is required` },
        { status: 400 }
      );
    }

    const JSONAttributes: any = formData.get("attributes");

    // Optionally, add more specific validation rules for each field

    await prisma.$transaction(async (prisma) => {
      // Create product entry
      const createdProduct = await prisma.products.create({
        data: {
          admin_id: session.user.id,
          product_title: details.title,
          product_description: details.description,
          price: details.price,
          stock_quantity: Number(details.stock),
          category_id: Number(details.category),
          brand_name: details.brand,
          is_featured: details.isFeatured == "true" ? true : false,
        },
      });

      if (JSONAttributes) {
        const attributes = JSON.parse(JSONAttributes);

        const attributeNames = attributes.map(
          (attribute: any) => attribute.attributeName
        );

        const storedAttributes = await prisma.attributes.findMany({
          select: {
            attribute_id: true,
            attribute_name: true,
          },
          where: {
            attribute_name: {
              in: attributeNames,
            },
          },
        });

        const storedAttributeNames = storedAttributes.map(
          (attribute: any) => attribute.attribute_name
        );

        const newAttributes = attributes.filter(
          (attribute: any) =>
            !storedAttributeNames.includes(attribute.attributeName)
        );

        // Create new attributes
        if (newAttributes.length > 0) {
          await prisma.attributes.createMany({
            data: newAttributes.map((attribute: any) => ({
              attribute_name: attribute.attributeName,
            })),
          });
        }

        const allAttributes = await prisma.attributes.findMany({
          select: {
            attribute_id: true,
            attribute_name: true,
          },
          where: {
            attribute_name: {
              in: attributeNames,
            },
          },
        });

        // Create product attributes
        await prisma.product_attributes.createMany({
          data: allAttributes.map((attribute: any) => ({
            product_id: createdProduct.product_id,
            attribute_id: attribute.attribute_id,
            value: attributes.find(
              (attr: any) => attr.attributeName === attribute.attribute_name
            ).attributeValue,
          })),
        });
      }

      await Promise.all(
        images.map(async (image: any) => {
          const imageUrl = await saveImage(image);
          await prisma.images.create({
            data: {
              image_url: imageUrl,
              product_id: createdProduct.product_id,
            },
          });
        })
      );
    });
    // If everything is valid, proceed with processing the request
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    console.error("POST Request Error:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
}
