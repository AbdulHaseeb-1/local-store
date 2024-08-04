import { GetProductByCategory } from "@/actions/getByCategory";
import { CardContent, Card, CardHeader, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import "@/../public/css/root.css";
import Link from 'next/link';
import AddToCart from "@/components/guest/Buttons/addToCart";
import { redirect } from "next/navigation";


export default async function Products({ params }: { params: { category_id: string } }) {

    const decodedString = decodeURIComponent(params.category_id);

    const c_id = Number(atob(decodedString));
    

    let products: any = [];
    let error: string | null = null;

    try {
        products = await GetProductByCategory(c_id);

    } catch (err) {
        console.error("Error fetching products:", err);
        error = "Something went wrong while fetching products.";
    }

    if (error) {
        redirect("/errors/sww");
        return null; // Required for TypeScript as redirect doesn't return a value
    }

    if (products.length === 0) {
        return <div className="text-center text-2xl">No Products Found</div>;
    }

    return (
        <section className="py-12 products">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col justify-between gap-8 mb-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-neutral-300 to-stone-400 bg-clip-text text-transparent">
                            {products[0].categories.category_name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {products[0].categories.description}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3">
                    {products.map((product: any) => (
                        <Card
                            key={product.product_id}
                            className="small-card flex flex-col w-40 md:w-48 h-auto bg-white rounded-lg shadow-md dark:bg-neutral-900 dark:shadow-neutral-900 transition-all hover:shadow-lg"
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
                                    {product.categories.category_name}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between font-semibold text-sm px-4  gap-2 pt-2">
                                <span className="text-neutral-700 dark:text-neutral-400">Rs. {product.price.toString()}</span>
                                <AddToCart product={{
                                    id: product.product_id.toString(),
                                    image_url: product.images[0].image_url,
                                    title: product.product_title,
                                    category: product.categories.category_name,
                                    quantity: product.quantity,
                                    price: product.price.toString()
                                }} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
