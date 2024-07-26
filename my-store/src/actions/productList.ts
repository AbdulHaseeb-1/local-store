import { auth } from "@/lib/auth";
import prisma from "@/lib/prismaClient";
import { redirect } from "next/navigation";
export async function GetProductList() {
  const session = await auth();
  const user = session?.user;

  if (!session) {
    redirect("/not-found");
  }
  try {
    const products = await prisma.products.findMany({
      where: {
        admin_id: Number(user?.id),
      },
      include: {
        images: true,
        categories: true,
        product_size: true,
      },
    });
    if (!products) {
      redirect("/not-found");
    }
    return products;
  } catch (error) {
    redirect("/errors/sww");
  }
}
