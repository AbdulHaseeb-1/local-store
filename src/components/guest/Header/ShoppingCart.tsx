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
                <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary rounded-full px-1.5 py-0.5 text-xs font-medium dark:text-black text-white">
                    {cartSize}
                </div>
                )}
            </div>
        </Link>
    )
}
