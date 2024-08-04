

import { auth } from "@/lib/auth";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export const dynamic = "force-dynamic";

const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};

export async function GET(req: NextRequest) {
  try {
    const session = await auth(); // Pass request for potential cookie handling

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let user_id: any = session.user.id;
    user_id = BigInt(user_id);

    const url = req.nextUrl; // Use nextUrl property from NextRequest
    const params = url.searchParams; // Access search parameters directly

    const page = parseInt(params.get("page") || "1", 10); // Default to page 1
    const perPage = parseInt(params.get("per_page") || "10", 10); // Limit results
    const skip = (page - 1) * perPage; // Calculate skip offset for pagination

    const products = await prisma.products.findMany({
      where: {
        admin_id: user_id,
      },
      include: {
        images: true,
        categories: true,
      },
      skip,
      take: perPage, // Limit results based on perPage
    });

    const count = await prisma.products.count({
      where: {
        admin_id: user_id,
      },
    });

    const totalPages = Math.ceil(count / perPage); // Calculate total pages

    const json = toJson({ products, totalPages });

    return NextResponse.json(json, { status: 200 });
  } catch (err) {
    console.error(err); // Log the actual error for debugging

    let message = "Something Went Wrong";
    if (err instanceof PrismaClientValidationError) {
      message = "Database error occurred."; // More specific message
    } else if (err instanceof TypeError) {
      message = "Invalid data type encountered.";
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}
