"use client";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CategorySkeleton from "@/components/skeletons/category";
export default function CategoryBar() {
  const [categories, setCategories]: any = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function getCategories() {
      const response = await axios.get("/products/guest/categories");
      const data = JSON.parse(response.data.categories);
      console.log(data);

      setCategories(data);
    }
    getCategories();
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
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-8 ">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category: any) => (
              <Link
                key={category.categoryId}
                href="#"
                className=" bg-neutral-100 hover:scale-105  shadow-md dark:bg-neutral-800 dark:hover:bg-neutral-700 flex flex-col items-center p-4  rounded-lg transition "
              >
                <Image
                  src={category.imageUrl}
                  alt="category"
                  width={60}
                  height={60}
                />
                <h3 className="text-lg font-medium text-center ">
                  {category.categoryName}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    );
}
