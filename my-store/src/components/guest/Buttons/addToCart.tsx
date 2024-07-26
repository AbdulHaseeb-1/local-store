"use client"
import { Button } from '@/components/ui/button'
import useCart from '@/Context/Cart'
import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md'

export default function AddToCart({ product }: any) {
    const { addToCart } = useCart()
    return (
        <Button
            className="bg-secondary hover:bg-secondary text-neutral-800 dark:text-white py-1 px-3 rounded  focus:outline-none focus:ring-2  focus:ring-opacity-75"
            onClick={() => addToCart(product)}
        >
            <MdAddShoppingCart size={22} />
        </Button>
    )
}
