import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // * Validation Admin Session
    const session = await auth();
    if (!session) {
      NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    // * Extracting FormData
    const formData = await req.formData();

    const name: any = formData.get("name");
    const description: any = formData.get("description");
    const image: any = formData.get("image");

    // * Validating Data
    if (!name && !description && !isValidImage(image)) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    // * Saving Image
    const imagePath = await saveImage(image);
    if (imagePath) {
      // * If Image is Saved
      const result = await prisma.categories.create({
        data: {
          categoryName: name,
          description,
          imageUrl: imagePath,
        },
      });
      // * Converting to JSON for client transfer
      const category = toJson(result);
      // * Returning Response
      return NextResponse.json({ category }, { status: 200 });
    } else {
      throw new Error("Image not saved");
    }
  } catch (err) {
    //* Catch Block
    console.error("Error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// *  ---------------------------------
const isValidImage = (image: any) =>
  image instanceof File &&
  (image.type === "image/png" || image.type === "image/jpeg");

// *  ---------------------------------
const getFileName = (file: any) => {
  const now = new Date();
  return `image_${now.getTime()}_${Math.random().toString(30)}`;
};

// *  ---------------------------------
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

// *  ---------------------------------
const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
