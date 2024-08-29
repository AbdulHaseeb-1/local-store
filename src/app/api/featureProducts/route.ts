export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.products.findMany({
      where: {
        is_featured: true,
      },
      select: {
        product_id: true,
        product_title: true,
        selling_price: true,
        product_description: true,
        quantity: true,
        images: {
          select: {
            image_id: true,
            image_url: true,
          },
          take: 1,
        },
        categories: {
          select: {
            categoryId: true,
            categoryName: true,
          },
        },
      },
    });
    if (!products) {
      return NextResponse.json(
        {
          message: "No products found",
        },
        { status: 404 }
      );
    }
    const json = toJson(products);

    return NextResponse.json(json, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
