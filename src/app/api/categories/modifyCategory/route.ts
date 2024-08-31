import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { toJson } from "@/lib/helpers";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { categoryId } = await req.json();

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    await prisma.categories.delete({
      where: {
        categoryId,
      },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error deleting category:", err);
    return NextResponse.json(
      {
        message: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data } = await req.json();
    const { categoryId, isActive } = data;

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    const uc = await prisma.categories.update({
      where: {
        // Replace with the appropriate identifier for the category you want to update, e.g., 'id'
        categoryId,
      },
      data: {
        is_active: !isActive,
      },
    });

    // Update all products associated with the category to be inactive
    await prisma.products.updateMany({
      where: {
        category_id: categoryId,
        is_active: isActive, // Replace with the actual category ID field in your products table
      },
      data: {
        is_active: !isActive,
      },
    });

    const updatedCategory = toJson(uc);
    const t = isActive ? "disabled" : "enabled";
    return NextResponse.json(
      { message: `Category ${t} successfully`, updatedCategory },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(`Error:`, err);
    return NextResponse.json(
      {
        message: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
