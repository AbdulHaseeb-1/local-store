"use client"
import useCart from '@/Context/Cart';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
export default function ShoppingCart() {
    // ? =========== States =================
    const { cart, flag } = useCart();
    const [cartSize, setCartSize] = useState(0);

    // *  Getting the size of the cart 

    useEffect(() => {
        setCartSize(cart.length);
    }, [cart, flag]);

    // * Cart icon with number of items in it
    return (
        <Link href="/cart">
            <div className="relative">
                <MdOutlineShoppingCart size={22} />
                {cartSize > 0 && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary rounded-full h-5 w-5 flex justify-center items-center text-xs font-medium  text-white">
                    {cartSize}
                </div>
                )}
            </div>
        </Link>
    )
}
