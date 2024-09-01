import React from "react";
import { BsStarFill } from "react-icons/bs";
import AddToCart from "../Buttons/addToCart";
import { BiStar } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  product_id: string;
  product_title: string;
  product_category: string;
  images: Record<string, any>[];
  categories: Record<string, string>;
  selling_price: number;
  quantity: number;
}

export default function ProductCard_V({ product }: { product: CardProps }) {
  return (
    <Card className="hover:scale-105 small-card flex flex-col max-w-[200px] max:w-[200px]  bg-white rounded-lg shadow-md dark:bg-neutral-900 dark:shadow-neutral-900 transition-all hover:shadow-lg">
      <Link href={`/products/details/${btoa(product.product_id)}`}>
        <CardHeader className="small-header p-0 relative justify-around aspect-square">
          <Image
            alt={`Image of ${product.product_title}`}
            className="object-cover h-[200px] w-[200px] rounded-t-lg focus:outline-none overflow-hidden"
            src={product.images[0].image_url}
            width={1000}
            height={1000}
          />
        </CardHeader>
        <CardContent className="px-2 py-2">
          <CardDescription className="h-5 line-clamp-1 text-xs text-neutral-700 dark:text-neutral-400">
            {product.categories.categoryName}
          </CardDescription>
          <CardTitle className="hover:underline text-sm font-medium  line-clamp-1 text-neutral-900 dark:text-white">
            {product.product_title}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-row justify-between flex-wrap font-semibold text-sm px-4  gap-2 pt-2">
        <div className="flex flex-col ">
          <span className="dark:text-neutral-200 text-md">
            Rs {product.selling_price.toString()}
          </span>
          <div className="flex">
            <BsStarFill className="text-yellow-500" />
            <BsStarFill className="text-yellow-500" />
            <BsStarFill className="text-yellow-500" />
            <BiStar />
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
        </div>
      </CardFooter>
    </Card>
  );
}
