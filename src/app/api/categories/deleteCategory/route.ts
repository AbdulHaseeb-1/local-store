import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { categoryId } = await req.json();

    if (!categoryId) {
      return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
    }

    await prisma.categories.delete({
      where: {
        categoryId,
      },
    });

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
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
