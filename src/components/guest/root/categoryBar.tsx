import axios from '@/lib/axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function CategoryBar() {
    let error: string | null = null;
    let categories = null;
    try {
        const response = await axios.get("/products/guest/categories");
        categories = JSON.parse(response.data.categories);

    } catch (err: any) {
        console.log(err.message);
        error = "500 | Something went wrong";
    }

    return (
        <section className="w-full py-12 md:py-16 lg:py-20 xl:py-24  ">
            <div className="container">
                <div className="flex flex-col  justify-between gap-4 md:flex-row md:gap-8">
                    <div className="space-y-2 text-left">
                        <h2 className="font-bold tracking-tighter text-2xl md:text-3xl   ">Categories</h2>
                        {/* <p className="text-gray-500 md:text-xl dark:text-gray-400">
                            Discover products tailored to your specific needs.
                        </p> */}
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {!error ? categories.map((c: any) =>
                        <Link key={c.categoryId}
                            className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-neutral-100 border shadow-md p-4 text-center transition-colors hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-gray-800"
                            href={`/products/categories/${btoa(c.categoryId)}`}
                        >
                            <Image
                                alt={"Category"}
                                className="h-12 w-12 object-contain"
                                height={64}
                                src={c.imageUrl}
                                style={{
                                    aspectRatio: "64/64",
                                    objectFit: "cover",
                                }}

                                width={64}
                            />
                            <h3 className="text-sm font-medium group-hover:underline">{c.categoryName}</h3>
                        </Link>
                    ) : <div className='col-span-full text-2xl text-center h-24 place-content-center '>
                        {error}
                    </div>}
                </div>
            </div>
        </section>
    )
}
