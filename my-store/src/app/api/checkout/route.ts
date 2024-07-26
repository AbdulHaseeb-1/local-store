import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

function generateErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: { message } }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { paymentInfo, customerInfo, products, total } = body;
    
    // Validate input data efficiently using destructuring assignment and type assertions
    if (!paymentInfo || !customerInfo || !total || !Array.isArray(products)) {
      return generateErrorResponse("Invalid Order Details", 400);
    }

    // Initialize total
    let originalProductsTotal = 0;

    const result: any = await prisma.$transaction(async (prisma) => {
      for (const product of products) {
        // Get the original product
        const original: any = await prisma.products.findUnique({
          where: { product_id: product.id },
          select: { product_id: true, price: true },
        });

        // Check if product exists and prices match
        if (original && product.price == original.price) {
          originalProductsTotal += product.quantity * original.price;
        } else {
          return generateErrorResponse("Invalid Order Details", 400);
        }
      }

      if (originalProductsTotal !== total) {
        return generateErrorResponse("Invalid Order Details", 400);
      }

      const orderAddress = await prisma.order_address.create({
        data: {
          city: customerInfo.city,
          state: customerInfo.state,
          address: customerInfo.shippingAddress,
        },
      });

      const createdOrder = await prisma.orders.create({
        data: {
          customer: customerInfo.name,
          phone: customerInfo.phone,
          total_amount: total,
          order_address_id: orderAddress.order_address_id,
        },
      });

      for (const product of products) {
        await prisma.order_items.create({
          data: {
            order_id: createdOrder.order_id,
            product_id: product.id,
            quantity: product.quantity,
            unit_price: Number(product.price),
            total_price:
              Number(product.quantity) * Number(product.price),
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json(
      { order_id: result.order_id.toString() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return generateErrorResponse(error.message || "An error occurred", 500);
  }
}
