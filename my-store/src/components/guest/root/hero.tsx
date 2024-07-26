import Image from 'next/image'
import React from 'react'
import "@/../public/css/root.css"
import { Button } from '@/components/ui/button'

export default function Hero() {
    return (
        <div className="flex flex-col md:flex-row ">
            {/* Left Side: Featured Product or Promo */}
            <div className="w-full bg-cover bg-center " style={{ backgroundImage: 'url(/images/backgrounds/heroBg.jpg)' }}>
                <div className="flex flex-col items-center justify-center h-full  bg-black bg-opacity-50 text-white py-20 ">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Offer</h2>
                    <p className="text-lg md:text-xl mb-6">Up to 50% off on selected items</p>
                    <button className="bg-white text-black py-2 px-4 rounded-lg text-lg hover:bg-gray-200">Shop Now</button>
                </div>
            </div>

        </div>
    );
}
