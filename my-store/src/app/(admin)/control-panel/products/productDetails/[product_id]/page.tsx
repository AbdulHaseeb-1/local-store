import AddToCart from "@/components/guest/Buttons/addToCart";
import ImageCarousel from "@/components/ImageCarousel"
import { Button } from "@/components/ui/button"
import axios from "@/lib/axios";
import Image from "next/image"

export default async function ProductDetails({ params }: { params: { product_id: string } }) {
  const product_id = params.product_id
  const decoded_id = atob(decodeURIComponent(product_id));

  const response = await axios.get(`/products/productDetails?id=${decoded_id}`);
  const product = JSON.parse(response.data.Product);

  return (
    <div className="flex flex-col">
      <section className="bg-gray-100 dark:bg-neutral-950 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="m-auto">
            <ImageCarousel images={product.images} />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{product.product_title}</h1>
            {/* <p className="text-gray-500 dark:text-gray-400 text-lg line-clamp-5">
              {product.product_description}
            </p> */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">Rs {product.price}</span>
            </div>
            <div className="flex gap-4">
              <Button variant={"secondary"}>Edit</Button>
              <Button variant={"destructive"}>Delete</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Product Description</h2>
              <p>{product.product_description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}