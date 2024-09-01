import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { toJson } from "@/lib/helpers";

// * Upload to Cloudinary Function
const uploadToCloudinary = async (iconString: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { upload_preset: "ml_default", folder: "categoryIcons" },
        (error, result) => {
          if (error) reject(new Error(error.message));
          else resolve(result);
        }
      )
      .end(iconString);
  });
};

// * POST Method Handler
export async function POST(req: NextRequest) {
  try {
    // * Validation Admin Session
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // * Extracting FormData
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;

    // * Validating Data Before Upload
    if (!name || !description || !icon) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    const iconString = JSON.parse(icon);

    // * Upload Image to Cloudinary
    const uploadResponse = await uploadToCloudinary(iconString);

    if (!uploadResponse || !uploadResponse.secure_url) {
      return NextResponse.json(
        { message: "Image Upload Failed" },
        { status: 500 }
      );
    }

    // * Save to Prisma

    const result = await prisma.categories.create({
      data: {
        categoryName: name,
        description,
        imageUrl: uploadResponse.secure_url,
        imagePublicId:uploadResponse.public_id,
      },
    });

    // * Convert result to JSON
    const category = toJson(result);

    // * Return Response
    return NextResponse.json({ category }, { status: 200 });
  } catch (err: any) {
    // * Error Handling
    console.error("Error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
