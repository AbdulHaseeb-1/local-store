"use client";

import React, { Suspense, useEffect, useState } from "react";
import "@/../public/css/root.css";
import axios from "@/lib/axios";
import FeatureProductSkeleton from "@/components/skeletons/featureProducts";
import ProductCard_V from "../Custom/productCard_V";

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
      <section className="  py-12 md:py-20 lg:py-12 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-8 mb-8">
            <div className="space-y-2 text-center pb-5">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
                Featured Products
              </h2>
              {/* <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                            Discover our curated selection of the best products for your lifestyle.
                        </p> */}
            </div>
          </div>

          <div className="grid grid-cols-2  md:flex md:flex-wrap justify-center  gap-3  ">
            {products.map((product: any) => (
              <ProductCard_V key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
}
