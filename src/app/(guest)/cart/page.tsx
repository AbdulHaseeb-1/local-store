"use client"
import { Button } from "@/components/ui/button"
import { BiMinus, BiPlus } from "react-icons/bi"
import Image from "next/image"
import useCart from "@/Context/Cart"
import { useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md"
import { Card, CardContent } from "@/components/ui/card"
import Crypto from "crypto-js";

export default function Component() {
  // ?  Creating separate  cart state to avoid hydration error
  //* ========States =================================
  const [total, setTotal] = useState(0);
  const [myCart, setMyCart]: any = useState([]);
  const { cart, removeFromCart, setCart } = useCart();







  useEffect(() => {
    setMyCart(cart);
    const newTotal = cart.reduce((prevTotal, item: any) => prevTotal + Number(item.price) * Number(item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  const updateCookies = (updatedCart: any) => {
    const SECRET: any = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
    const stringify = JSON.stringify(updatedCart);
    const encrypted = Crypto.AES.encrypt(stringify, SECRET).toString();
    Cookies.set('ls-cart', encrypted, { expires: 30 });
  };

  const handleAddQuantity = (productId: string) => {
    setCart((prevCart: any) => {
      return prevCart.map((item: any) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    })
    updateCookies(cart);
  };

  const handleRemoveQuantity = (productId: string) => {
    setCart((prevCart: any) => {
      return prevCart.map((item: any) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    })
    updateCookies(cart);
  };


  if (myCart.length == 0) {
    return <div className="flex flex-col flex-wrap items-center justify-center h-full py-8">
      <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center px-3   ">Looks like you haven{"'"}t added anything to your cart yet.</p>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="lg" className="w-48">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/">
          <Button variant="default" size="lg" className="w-48">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  }




  return (
    <section className="max-w-[1400px] m-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 p-8">
          <div className="grid gap-4">
            {myCart.map((item: any) =>
              <Card key={item.id}>
                <CardContent className="grid gap-4 ">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 py-4">
                      <Image src={item.image} alt="Product" width={64} height={64} className="rounded-md" />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{item.category}</p>
                      </div>
                    </div>
                    <div>
                      <Button size={"icon"} variant={"ghost"} onClick={() => {
                        removeFromCart(item.id)
                      }}>
                        <MdDelete size={22} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => {
                        handleRemoveQuantity(item.id);
                      }}>
                        <BiMinus className="w-4 h-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => {
                        handleAddQuantity(item.id)
                      }}>
                        <BiPlus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-500 dark:text-gray-400 "> Rs {item.price}</span>
                      <span className="">Rs {Number(item.price) * Number(item.quantity)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="bg-gray-100 dark:bg-neutral-900 rounded-lg p-6 sticky top-8">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">Rs {total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Discount</span>
                <span className="font-medium text-green-500">-Rs 0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="font-medium">Rs 200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="font-medium text-2xl">Rs {Number(total) + 200}</span>
              </div>
              <Link href={"/checkout"}>
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
