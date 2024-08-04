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
  const url = req.nextUrl;
  const params = url.searchParams;
  const id: any = params.get("id");

  if (!id) {
    console.log("here");
  } else {
    const product = await prisma.products.findUnique({
      where: {
        product_id: Number(id),
      },
      include: {
        images: true,
        categories: true,
      },
    });
    if (!product) {
      return NextResponse.json({}, { status: 404 });
    }
    const Product = toJson(product);

    return NextResponse.json({ Product }, { status: 200 });
  }
}
