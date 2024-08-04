import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { BiLock } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';




export default function Services() {
    const features = [
        {
            title: "Fast Delivery",
            description: " Get your orders delivered in lightning-fast time, with our reliable shipping partners.",
            icon: <BsTruck className="h-6 w-6 text-primary-foreground" />
        },
        {
            title: "On Time Delivery",
            description: " Get your orders delivered in lightning-fast time, with our reliable shipping partners.",
            icon: <BsTruck className="h-6 w-6 text-primary-foreground" />
        },
        {
            title: "Fast Delivery",
            description: " Get your orders delivered in lightning-fast time, with our reliable shipping partners.",
            icon: <BsTruck className="h-6 w-6 text-primary-foreground" />
        },
        {
            title: "Fast Delivery",
            description: " Get your orders delivered in lightning-fast time, with our reliable shipping partners.",
            icon: <BsTruck className="h-6 w-6 text-primary-foreground" />
        },
    ];

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container pb-10 flex flex-col justify-between gap-4 md:flex-row md:gap-8">
                <div className="space-y-2  text-left">
                    <h2 className="font-bold tracking-tighter text-2xl md:text-3xl  ">Services</h2>
                    {/* <p className="text-gray-500 md:text-xl dark:text-gray-400">
                            Discover products tailored to your specific needs.
                        </p> */}
                </div>
            </div>
            <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:px-6 ">
                {features.map((feature, index) =>
                    <div key={index} className="border hover:text-white  hover:bg-gradient-to-r from-red-600 to-orange-600   flex flex-col items-start gap-4 rounded-lg bg-background p-6 shadow-sm transition hover:shadow-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="">
                            {feature.description}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}


