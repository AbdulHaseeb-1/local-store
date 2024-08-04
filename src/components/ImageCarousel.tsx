import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function ImageCarousel({ images }: any) {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {images.map((_:any,index:string) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square  p-0  ">
                                  <Image src={_.image_url} alt="image" width={1000} height={10000} className="rounded-md" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
