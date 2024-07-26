import { redirect } from "next/navigation";
import prisma from "@/lib/prismaClient";
export async function GetProductByCategory(category_id: number) {

  try {
    const products = await prisma.products.findMany({
      where: {
        category_id: category_id,
      },
      include: {
        images: true,
        categories: true,
      },
    });

    if (!products) {
      throw new Error("No Product found.");
    }

    return products;
  } catch (err) {
    console.log(err);
    redirect("/errors/sww");
  }
}
