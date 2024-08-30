"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

export default function BestChoices() {
  return (
    <Card className="w-96">
      <CardHeader className="h-96">
        <Image
          src="https://utfs.io/f/8875b261-0290-4dbc-b9fe-6bcc6abdc8b3-kbs70x.png"
          alt="card-image"
          className="h-full w-full object-cover"
          width={1000}
          height={1000}
        />
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <p color="blue-gray" className="font-medium">
            Apple AirPods
          </p>
          <p color="blue-gray" className="font-medium">
            $95.00
          </p>
        </div>
        <p color="gray" className="font-normal opacity-75">
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
