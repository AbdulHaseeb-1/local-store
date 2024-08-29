"use server";
import prisma from "@/lib/prismaClient";

export default async function getCategories() {
  let error: string | null = null;
  try {
    const categories = await prisma.categories.findMany({
      select: {
        categoryId: true,
        categoryName: true,
        imageUrl: true,
      },
    });
    return {
      categories,
      error: null,
    };
  } catch (err: any) {
    console.log(err.message);
    error = "500 | Something went wrong";
    return {
      categories: null,
      error,
    };
  }
}
