import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
export async function DELETE(req: NextRequest) {
  const url = req.nextUrl;
  const params = url.searchParams;
  const id = Number(params.get("id"));
  if (!id) {
    return NextResponse.json({}, { status: 404 });
  }
  try {
    const result = await prisma.products.delete({
      where: {
        product_id: id,
      },
    });
    if (!result) {
      throw new Error("Something went wrong");
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
