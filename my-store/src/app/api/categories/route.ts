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
    const categories = await prisma.categories.findMany();
    const count = categories.length;
    const json = toJson(categories);

    return NextResponse.json({ json, length: count}, { status: 200 });
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
