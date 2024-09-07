import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  BiCart,
  BiCartAdd,
  BiPurchaseTag,
  BiRupee,
  BiStar,
} from "react-icons/bi";
import { BsCurrencyRupee, BsStarFill } from "react-icons/bs";

interface ProductProps {
  imageUrl: string;
  brandName: string;
  title: string;
  subTitle: string;
  price: string;
}

export default function SpecialProductCard({
  imageUrl,
  brandName,
  title,
  subTitle,
  price,
}: ProductProps) {
  return (
    <div className="shadow-lg relative  ">
      <div className="flex h-72 w-80 rounded-r-full md:absolute  overflow-hidden  md:ml-5">
        <Image
          src={imageUrl}
          alt="mouse"
          width={2000}
          height={2000}
          className="z-20"
        />
      </div>
      <div className="md:h-80 md:w-[34rem] px-4 md:p-0 bg-green-600/10 border-primary border border-opacity-20 z-5 md:ml-[110px] -ml-5  relative -mt-16  md:mt-0">
        <div className="md:absolute md:ml-60 h-72 md:h-80 md:w-[19rem] z-10">
          <div className="flex items-center space-x-3">
            <h1 className="z-30 bg-primary-gradient bg-clip-text text-transparent font-bold text-[22px] mt-[21px] inline-block">
              {brandName}
            </h1>
          </div>
          <div className="mt-6">
            <h2 className="text-white text-2xl font-extrabold mt-2 line-clamp-1 ">
              {title}
            </h2>
            <h3 className="text-muted-foreground text-lg font-medium ">
              {subTitle}
            </h3>
            <h4 className="bg-primary-gradient bg-clip-text text-transparent  inline-block text-xl font-bold mt-2">
              Rs {price}
            </h4>
          </div>

          <div className="flex">
            <BsStarFill className="text-yellow-500" />
            <BsStarFill className="text-yellow-500" />
            <BsStarFill className="text-yellow-500" />
            <BiStar />
            <BiStar />
          </div>
          <div className="flex mt-10 space-x-3">
            <Button
              variant={"ghost"}
              size={"sm"}
              className=" transition-colors duration-300 bg-green-400/15 hover:bg-green-400/20   cursor-pointer flex gap-2 "
            >
              <BiPurchaseTag size={16} />
              Buy Now
            </Button>
            <Button
              size={"sm"}
              className="text-white transition-colors duration-300  border bg-primary-gradient cursor-pointer flex gap-2"
            >
              <BiCartAdd size={16} />
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
