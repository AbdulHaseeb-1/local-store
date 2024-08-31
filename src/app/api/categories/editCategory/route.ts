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
    const imageUrl = form.get("imageUrl");

    let updatedData: any = {
      categoryName,
      description,
    };
    if (imageUrl) {
      updatedData = {
        ...updatedData,
        imageUrl,
      };
    }
    console.log(imageUrl);
    

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

const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
