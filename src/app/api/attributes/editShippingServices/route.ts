import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const {
      return_policy,
      delivery_info,
    }: { return_policy: string; delivery_info: string } = await req.json();

    let updatedServices;

    try {
      // Attempt to update the record
      updatedServices = await prisma.special_attributes.update({
        where: { id: 1 },
        data: { return_policy, delivery_info },
      });
    } catch (error: any) {
      // Check if the error is related to the record not being found
      if (error.code === "P2025") {
        // Prisma-specific error code for "Record not found"
        // If the record is not found, create a new one
        updatedServices = await prisma.special_attributes.create({
          data: { id: 1, delivery_info, return_policy },
        });
      } else {
        // If any other error, rethrow it
        throw error;
      }
    }

    return NextResponse.json(
      { message: "Updated successfully", updatedServices },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating services:", error);
    return NextResponse.json(
      { message: `Failed to update services : ${error.message}` },
      { status: 500 }
    );
  }
}
