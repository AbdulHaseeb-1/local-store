"use client";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CategorySkeleton from "@/components/skeletons/category";
import { useToast } from "@/Context/toast";
import { BiGame } from "react-icons/bi";
import { parse } from "path";

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
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-8 md:mb-10 lg:mb-12 text-center">
              <h2 className="text-2xl font-bold  md:text-3xl lg:text-4xl">
                Shop by Category
              </h2>
            </div>

            <div className="flex gap-4 justify-center">
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
      href={`#${categoryName.toLowerCase()}`}
      className="group flex flex-col items-center justify-center w-40 h-28 rounded-lg border border-green-500/40 transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(40,201,129,0.5)] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 opacity-10 group-hover:opacity-25 transition-opacity duration-300 ease-in-out" />


      {/* {categoryIcon} */}
      {/* <BiGame
        size={22}
        className="w-8 h-8 mb-2 text-gray-400 group-hover:text-green-500 transition-all duration-300 ease-in-out transform group-hover:scale-110"
      /> */}
      {/* <categoryIcon className="w-8 h-8 mb-2 text-gray-400 group-hover:text-green-500 transition-all duration-300 ease-in-out transform group-hover:scale-110" /> */}
      <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-xs font-medium text-center px-1">
        {categoryName}
      </span>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 transform scale-x-100 transition-transform duration-300 ease-in-out" />
    </Link>
  );
}
