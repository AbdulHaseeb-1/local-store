"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Pagination from "../../../paginate"
import axios from "@/lib/axios"
import { Label } from "@/components/ui/label"
import Link from "next/link"
export default function Component() {
    const [products, setProducts]: any = useState([]); // State to store fetched products
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [perPage, setPerPage] = useState(10); // Products per page
    const [totalPages, setTotalPages] = useState(1); // Total pages (initially set to 1)
    const [error, setError] = useState("");



    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get(
                    `/products/productList?page=${currentPage}&per_page=${perPage}`
                );
                const data = JSON.parse(response.data);
                setProducts(data.products);
                setTotalPages(Math.ceil(data.totalPages || 1 / perPage)); // Calculate totalPages from API response (if available) or use a default value
            } catch (err) {
                setError("Internal Server Error");
            }
            // console.log(data);
        }

        getProducts();
    }, [currentPage, perPage]); // Re-fetch data on page/per_page change

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const handlePerPageChange = (itemsPerPage: any) => {
        setPerPage(itemsPerPage);
        // Recalculate totalPages based on new perPage value (optional)
    };
    // ! If Error from server
    if (error) {
        return <div className="flex justify-center mt-10 text-xl">{error}</div>
    }
    // * If everything is OK
    else return (
        <div className="grid ">
            <div className=" rounded-lg shadow-sm ">
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
                    <h3 className="font-semibold text-lg">Products</h3>
                    {/* <div className="flex gap-2 items-center">
                        <Checkbox id="select-all" />
                        <Label htmlFor="select-all">Select All</Label>
                    </div> */}
                </div>
                <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3  gap-4">
                    {products.map((product: any) => (
                        <div key={product.product_id} className="flex items-center gap-3 bg-neutral-100  dark:bg-neutral-900 shadow rounded-lg p-3">
                            {/* <Checkbox /> */}
                            <Image
                                src={product.images[0].image_url}
                                alt="image"
                                width={70}
                                height={70}
                                className="w-auto h-auto rounded-lg object-cover aspect-square"
                            />
                            <div className="flex-1">
                                <Link href={`productDetails/${btoa(product.product_id)}`}>
                                    <h4 className="font-semibold  text-ellipsis line-clamp-1">{product.product_title}</h4>
                                </Link>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{product.categories.category_name}</p>
                                <p className="font-semibold">Rs {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages} // Use the calculated totalPages state
                perPage={perPage}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
            />
        </div>
    )
}