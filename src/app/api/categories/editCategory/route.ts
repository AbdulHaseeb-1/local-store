import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
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
    const icon: any = form.get("icon");
    let iconString, prevImagePublicId: any;

    let updatedData: any = {
      categoryName,
      description,
    };

    if (icon) {
      iconString = JSON.parse(icon);
      prevImagePublicId = form.get("prevImagePublicId");


      const uploadResponse = await uploadToCloudinary(iconString);
      if (!uploadResponse || !uploadResponse.secure_url) {
        return NextResponse.json(
          { message: "Image Upload Failed" },
          { status: 500 }
        );
      }
      await cloudinary.uploader.destroy(prevImagePublicId, {
        invalidate: true,
      });

      if (iconString) {
        updatedData = {
          ...updatedData,
          imageUrl: uploadResponse.secure_url,
          imagePublicId: uploadResponse.public_id,
        };
      }
    }

    const result = await prisma.categories.update({
      where: {
        categoryId,
      },
      data: updatedData,
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
