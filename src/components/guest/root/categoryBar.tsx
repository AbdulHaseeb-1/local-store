"use client";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CategorySkeleton from "@/components/skeletons/category";
import { useToast } from "@/Context/toast";

export default function CategoryBar() {
  const [categories, setCategories]: any = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("/products/guest/categories");
        const data = JSON.parse(response.data.categories);
        setCategories(data);
      } catch (error: any) {
        console.log(error);
        showToast("Something went wrong,Please try again later", "error", 5000);
      }
    }
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (categories.length == 0) {
    return <CategorySkeleton />;
  } else
    return (
      <motion.section
        initial={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1 }}
        className="py-12 h-full"
      >
        <section className="bg-background py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-8 md:mb-10 lg:mb-12 text-center">
              <h2 className="text-2xl font-bold  md:text-3xl lg:text-4xl">
                Shop by Category
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {categories.map((category: any) => (
                <CategoryCard
                  key={category.categoryId}
                  categoryName={category.categoryName}
                  categoryIcon={category.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </motion.section>
    );
}

function CategoryCard({ categoryName, categoryIcon }: any) {
  return (
    <Link
      href="#"
      className="group relative flex flex-col items-center justify-center rounded-lg bg-muted dark:bg-secondary p-4 transition-transform duration-300 hover:shadow-xl hover:scale-105"
      prefetch={false}
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full   text-white transition-colors duration-300 ">
        <Image
          src={categoryIcon}
          width={3000}
          height={3000}
          alt={categoryName}
          className="w-full h-full"
        />
      </div>
      <h3 className="text-base font-medium  transition-colors duration-300 group-hover:text-[#059669]">
        {categoryName}
      </h3>
    </Link>
  );
}
