"use client";
import AddToCart from "@/components/guest/Buttons/addToCart";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/Context/toast";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";

export default function ProductDetails({
  params,
}: {
  params: { product_id: string };
}) {
  const [product, setProduct]: any = useState({});
  const { showToast } = useToast();

  useEffect(() => {
    async function getProduct() {
      try {
        const product_id = params.product_id;
        const decoded_id = atob(decodeURIComponent(product_id));

        const response = await axios.get(
          `/products/productDetails?id=${decoded_id}`
        );

        const product = JSON.parse(response.data.Product);
        setProduct(product);
      } catch (error: any) {
        console.error("Error fetching product:", error); // Log the error for debugging
        showToast("500 | Something went wrong", "error");
      }
    }
    getProduct();
  }, [params.product_id, showToast]); // Include params.product_id in the dependency array

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Section: Image Carousel */}
        <div className="space-y-4 flex justify-center">
          <div className="  ">
            <ImageCarousel images={product.images || []} />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {product.product_title}
          </h1>
          {/* <p className="text-xl text-muted-foreground">
            Experience crystal clear audio with supreme comfort
          </p> */}

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <BsStarFill
                key={i}
                className={`w-5 h-5 ${
                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-muted-foreground">(121 reviews)</span>
          </div>

          <div className="text-4xl font-bold">Rs {product.selling_price}</div>

          <div className="flex space-x-4">
            {/* <AddToCart
              product={{
                id: product.product_id,
                image_url: product.images[0].image_url,
                title: product.product_title,
                category: product.categories.categoryName,
                quantity: product.quantity,
                price: product.selling_price.toString(),
              }}
            />{" "} */}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          {product.product_description}
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Driver Size
              </dt>
              <dd className="mt-1 text-sm text-foreground">40mm</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Frequency Response
              </dt>
              <dd className="mt-1 text-sm text-foreground">20Hz - 20kHz</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Impedance
              </dt>
              <dd className="mt-1 text-sm text-foreground">32 Ohm</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Battery Life
              </dt>
              <dd className="mt-1 text-sm text-foreground">Up to 30 hours</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Charging Time
              </dt>
              <dd className="mt-1 text-sm text-foreground">2 hours</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Bluetooth Version
              </dt>
              <dd className="mt-1 text-sm text-foreground">5.0</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Weight
              </dt>
              <dd className="mt-1 text-sm text-foreground">250g</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Warranty
              </dt>
              <dd className="mt-1 text-sm text-foreground">2 years</dd>
            </div>
          </dl>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <p>Reviews content will go here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
