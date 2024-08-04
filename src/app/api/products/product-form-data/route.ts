export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import path from "path";
import { writeFile } from "fs";
import { auth } from "@/lib/auth";
import { Judson } from "next/font/google";

export async function GET(req: NextRequest) {
  try {
    const result = await prisma.categories.findMany({
      select: {
        categoryId: true,
        categoryName: true,
      },
    });
    const categories = toJson(result);

    const sizes = await prisma.product_size.findMany({
      select: {
        size_id: true,
        size: true,
      },
    });

    return NextResponse.json({ categories, sizes, status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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
      (image.type === "image/png" || image.type === "image/jpeg");

    if (!images.every(isValidImage)) {
      throw new Error("Invalid image");
    }

    // Validate others object
    const requiredFields = [
      "title",
      "description",
      "category",
      "price",
      "stock",
      "brand",
      "isFeatured",
    ];
    const others: any = Object.fromEntries(
      requiredFields.map((field) => [field, formData.get(field)])
    );

    if (Object.values(others).some((value) => !value)) {
      const missingField = requiredFields.find((field) => !others[field]);
      return NextResponse.json(
        { message: `${missingField} is required` },
        { status: 400 }
      );
    }

    const JSONAttributes: any = formData.get("attributes");
    console.log(JSONAttributes);

    // Optionally, add more specific validation rules for each field

    prisma.$transaction(async (prisma) => {
      // Create product entry
      const createdProduct = await prisma.products.create({
        data: {
          admin_id: session.user.id,
          product_title: others.title,
          product_description: others.description,
          price: others.price,
          stock_quantity: Number(others.stock),
          category_id: Number(others.category),
          brand_name: others.brand,
          is_featured: others.isFeatured == "true" ? true : false,
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
          console.log(imageUrl);
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
    console.error("POST request error:", error);
    if (error.message === "Invalid image") {
      return NextResponse.json({ message: "Invalid image" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Function to check if image type is valid

// Function to save image to file
async function saveImage(imageData: any) {
  try {
    const buffer: any = Buffer.from(await imageData.arrayBuffer());
    const now = new Date();
    const filename = `image_${now.getTime()}_${Math.random().toString(30)}`;
    const imagePath = "/images/products/" + filename + ".png";
    writeFile(
      path.join("public/images/products/" + filename + ".png"),
      buffer,
      (err) => {
        if (err) {
          console.error("Error saving image:", err);
          throw new Error("Failed to save image");
        } else {
          console.log("Image saved:", filename);
        }
      }
    );
    return imagePath;
  } catch (err) {
    console.error("Error saving image:", err);
    throw new Error("Failed to save image");
  }
}

const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
