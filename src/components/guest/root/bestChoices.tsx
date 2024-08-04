import React from 'react'
import ProductCardHorizontal from '../Custom/ProductCard_H'

export default function BestChoices() {
    return (
        <div className=" container grid  gap-3 md:grid-cols-2 lg:grid-cols-3">
            <ProductCardHorizontal />
            <ProductCardHorizontal />
            <ProductCardHorizontal />
        </div>
    )
}
