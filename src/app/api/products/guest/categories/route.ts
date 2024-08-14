export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { toJson } from "@/lib/helpers";

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        categoryId: true,
        categoryName: true,
        imageUrl: true,
      },
    });

    // Convert categories to JSON format for response
    
    const json = toJson(categories);

    return NextResponse.json({ categories: json }, { status: 200 });
  } catch (error) {
    console.log("Error :", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

