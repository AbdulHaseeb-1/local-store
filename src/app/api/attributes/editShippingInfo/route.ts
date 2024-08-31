import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { shippingFee }: { shippingFee: string } = await req.json();

    // Ensure that shippingFee is a valid number
    const shippingFeeNumber = Number(shippingFee);
    if (isNaN(shippingFeeNumber)) {
      return NextResponse.json(
        { message: "Invalid shipping fee" },
        { status: 400 }
      );
    }

    let updatedInfo;

    try {
      // Attempt to update the record
      updatedInfo = await prisma.special_attributes.update({
        where: { id: 1 },
        data: { shipping_fee: shippingFeeNumber },
      });
    } catch (error: any) {
      // Check if the error is related to the record not being found
      if (error.code === "P2025") {  // Prisma-specific error code for "Record not found"
        // If the record is not found, create a new one
        updatedInfo = await prisma.special_attributes.create({
          data: { id: 1, shipping_fee: shippingFeeNumber },
        });
      } else {
        // If any other error, rethrow it
        throw error;
      }
    }

    return NextResponse.json(
      { message: "Updated successfully", updatedInfo },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating info:", error);
    return NextResponse.json(
      { message: "Failed to update info", error: error.message },
      { status: 500 }
    );
  }
}
