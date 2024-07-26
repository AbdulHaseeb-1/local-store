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
    const perPage = parseInt(params.get("perPage") || "10", 10);
    const currentPage = parseInt(params.get("currentPage") || "1", 10);

    const skip = (currentPage - 1) * perPage;
    const take = perPage;

    const orders = await prisma.orders.findMany({
      skip,
      take,
    });

    const totalOrders = await prisma.orders.count();
    const totalPages = Math.ceil(totalOrders / perPage);

    const json = toJson({orders,totalPages,totalOrders});
    
    return NextResponse.json(json, { status: 200 });


  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: { message: "Something went wrong" } },
      { status: 500 }
    );
  }
}
