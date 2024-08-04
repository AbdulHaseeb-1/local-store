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
    const params = req.nextUrl.searchParams;
    const order_id: any = params.get("order_id");

    const order = await prisma.orders.findUnique({
      where: { order_id: order_id },
      include: {
        order_address: true,
        order_items: {
          include: {
            products: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
    const json = toJson(order);
    return NextResponse.json(json, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
