import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import path from "path";
import { writeFile } from "fs/promises";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form: FormData = await req.formData();
    const categoryId = Number(form.get("categoryId"));
    const categoryName = form.get("categoryName")?.toString();
    const description = form.get("description")?.toString();
    const categoryIcon = form.get("categoryIcon");

    let updateData: any = {
      categoryName,
      description,
    };

    const isValidImage = (image: any) =>
      image instanceof File &&
      (image.type === "image/png" ||
        (image.type === "image/jpeg" && image.size < 4000000));

    if (categoryIcon && isValidImage(categoryIcon)) {
      // * Saving Image
      const imagePath = await saveImage(categoryIcon);
      if (imagePath) {
        // * If Image is Saved
        updateData = { ...updateData, imageUrl: imagePath }; // Update this line as per how you want to save the image
      }
    }

    const result = await prisma.categories.update({
      where: {
        categoryId,
      },
      data: updateData,
    });
    const updatedCategory = toJson(result);

    return NextResponse.json(
      { message: "Category updated successfully", data: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}

const getFileName = (file: any) => {
  const now = new Date();
  return `image_${now.getTime()}_${Math.random().toString(30)}`;
};

async function saveImage(image: any) {
  try {
    const buffer: any = Buffer.from(await image.arrayBuffer());
    const filename = getFileName(image);
    const imagePath = "/images/icons/" + filename + ".png";
    const fullPath = path.join("public/images/icons/" + filename + ".png");

    await writeFile(fullPath, buffer);

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
