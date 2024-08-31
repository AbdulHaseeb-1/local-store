import { auth } from "@/lib/auth";
import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await prisma.special_attributes.findFirst({
      select: {
        shipping_fee: true,
        delivery_info: true,
        return_policy: true,
      },
    });
    return NextResponse.json(
      {
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error getting data:", error);
    return NextResponse.json(
      { message: "Failed to get data" },
      { status: 500 }
    );
  }
}
