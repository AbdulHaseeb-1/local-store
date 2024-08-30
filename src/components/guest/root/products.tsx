"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  CardContent,
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import "@/../public/css/root.css";
import axios from "@/lib/axios";
import Link from "next/link";
import AddToCart from "../Buttons/addToCart";
import { Button } from "@/components/ui/button";
import FeatureProductSkeleton from "@/components/skeletons/featureProducts";
import { BsEye, BsStarFill } from "react-icons/bs";
import { BiStar } from "react-icons/bi";

export default function FeatureProducts() {
  // ? ============ States ===============================
  const [products, setProducts]: any = useState([]);
  const [error, setError]: any = useState("");

  // * ============= Fetching Products ===================
  useEffect(() => {
    // * Async method for fetching
    async function getProducts() {
      try {
        const response = await axios.get("/featureProducts");
        const data = JSON.parse(response.data);
        setProducts(data);
      } catch (err) {
        setError("Internal Server Error");
      }
    }
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length == 0) {
    return <FeatureProductSkeleton />;
  } else
    return (
      <section className="py-12 md:py-20 lg:py-12 products">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-8 mb-8">
            <div className="space-y-2 text-start pb-5">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
                Featured Products
              </h2>
              {/* <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                            Discover our curated selection of the best products for your lifestyle.
                        </p> */}
            </div>
          </div>

          <div className=" flex md:flex-wrap justify-center gap-3  ">
            {products.map((product: any) => (
              <Card
                key={product.product_id}
                className="small-card flex flex-col w-48 md:w-48 h-auto bg-white rounded-lg shadow-md dark:bg-neutral-900 dark:shadow-neutral-900 transition-all hover:shadow-lg"
              >
                <CardHeader className="small-header p-0 relative w-full h-40 md:h-48 justify-around">
                  <Image
                    alt={`Image of ${product.product_title}`}
                    className="object-contain h-full w-full rounded-t-lg focus:outline-none"
                    src={product.images[0].image_url}
                    width={1000}
                    height={1000}
                  />
                </CardHeader>
                <CardContent className="px-2 py-2">
                  <Link href={`/products/details/${product.product_id}`}>
                    <CardTitle className="hover:underline text-sm font-medium h-11 line-clamp-2 text-neutral-900 dark:text-white">
                      {product.product_title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="h-5 line-clamp-1 text-xs text-neutral-700 dark:text-neutral-400">
                    {product.categories.categoryName}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row justify-between font-semibold text-sm px-4  gap-2 pt-2">
                  <div className="flex flex-col ">
                    <span className="text-white text-md">
                      Rs. {product.selling_price.toString()}
                    </span>
                    <div className="flex">
                      <BsStarFill className="text-yellow-500" />
                      <BsStarFill className="text-yellow-500" />
                      <BsStarFill className="text-yellow-500" />
                      <BiStar  />
                      <BiStar />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <AddToCart
                      product={{
                        id: product.product_id.toString(),
                        image_url: product.images[0].image_url,
                        title: product.product_title,
                        category: product.categories.categoryName,
                        quantity: product.quantity,
                        price: product.selling_price.toString(),
                      }}
                    />
                    <Button size={"icon"} variant={"secondary"}>
                      <BsEye size={20} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
}
