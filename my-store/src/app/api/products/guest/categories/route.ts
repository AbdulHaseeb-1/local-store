import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
export const dynamic = "force-dynamic";

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

const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
