export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { toJson } from "@/lib/helpers";


export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.categories.findMany();
    const count = categories.length;
    const json = toJson(categories);

    return NextResponse.json({ json, length: count }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse(error.message, {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
