"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import useCart from "@/Context/Cart";
import CheckoutValidator from "@/Validators/checkoutVlalidator";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "@/lib/axios";

const initialStates = {
  name: "",
  phone: "",
  shippingAddress: "",
  paymentMethod: "",
  city: "",
  state: "",
};

const initialShippingStates = {
  shipping_fee: 0,
  return_policy: "",
  delivery_time: "",
};

const errorDefault = {
  path: "",
  message: "",
};

export default function Checkout() {
  const [formData, setFormData] = useState(initialStates);
  const [shippingDetails, setShippingDetails] = useState(initialShippingStates);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]: any = useState(errorDefault);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function getShippingData() {
      const response = await axios.get("/checkout");
      setShippingDetails(response.data.data);
    }
    setProducts(cart);
    const newTotal = cart.reduce(
      (prevTotal, item: any) =>
        prevTotal + Number(item.price) * Number(item.quantity),
      0
    );
    setTotal(newTotal);
    getShippingData();
  }, [cart]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  function handleChange(e: any) {
    setError(errorDefault);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(errorDefault);

    const { error } = CheckoutValidator.validate(formData);

    if (error) {
      setError({
        path: error.details[0].path,
        message: error.details[0].message,
      });
      setIsSubmitting(false);
      return;
    }

    const data = {
      paymentInfo: {
        paymentMethod: formData.paymentMethod,
      },
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        state: formData.state,
      },
      products,
      total: total + shippingDetails.shipping_fee,
    };
    try {
      const response = await axios.post("/checkout", data);
      
      switch (response.status) {
        case 400: {
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            variant: "destructive",
            title: "Error",
            description: "Invalid Inputs",
          });
          setIsSubmitting(false);
          break;
        }
        case 500: {
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
          setIsSubmitting(false);
          break;
        }
        case 200: {
          const order_id = response.data.order_id;
          setIsSubmitting(false);
          router.push(`/checkout/success/${order_id}`);
          break;
        }
        default: {
          console.log(response);
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            variant: "destructive",
            title: "Error",
            description: "Something went wrong 0",
          });
          setIsSubmitting(false);
          return;
        }
      }
    } catch (err) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        title: "Error",
        description: "Something went wrong ",
      });
      setIsSubmitting(false);
      return;
    }
  }

  return (
    <div className="min-h-screen  ">
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                className={clsx("", {
                  "border border-red-400": error && error.path[0] === "name",
                })}
              />
              {error && error.path[0] === "name" && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="number"
                placeholder="Enter your phone number"
                name="phone"
                onChange={handleChange}
                className={clsx("", {
                  "border border-red-400": error && error.path[0] === "phone",
                })}
              />
              <div className="flex flex-col mt-1">
                <span className="text-xs text-gray-400">
                  Example: 03001234567
                </span>
                {error && error.path[0] === "phone" && (
                  <span className="text-xs text-red-400">{error.message}</span>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  onChange={handleChange}
                  className={clsx("", {
                    "border border-red-400": error && error.path[0] === "city",
                  })}
                />
                <div className="flex flex-col mt-1">
                  {error && error.path[0] === "city" && (
                    <span className="text-xs text-red-400">
                      {error.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="state"
                  placeholder="Enter your state"
                  name="state"
                  onChange={handleChange}
                  className={clsx("", {
                    "border border-red-400": error && error.path[0] === "state",
                  })}
                />
                <div className="flex flex-col mt-1">
                  {error && error.path[0] === "state" && (
                    <span className="text-xs text-red-400">
                      {error.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Textarea
                id="shippingAddress"
                placeholder="Enter your shipping address"
                rows={3}
                name="shippingAddress"
                onChange={handleChange}
                className={clsx("", {
                  "border border-red-400":
                    error && error.path[0] === "shippingAddress",
                })}
              />
              {error && error.path[0] === "shippingAddress" && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="payment">Payment Method</Label>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) => {
                  setError({ path: "", message: "" });
                  {
                    setFormData((prevState) => ({
                      ...prevState,
                      paymentMethod: value,
                    }));
                  }
                }}
              >
                <SelectTrigger
                  className={clsx("", {
                    "border border-red-400":
                      error && error.path[0] === "paymentMethod",
                  })}
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash_on_delivery">
                    Cash On Delivery
                  </SelectItem>
                </SelectContent>
              </Select>
              {error && error.path[0] === "paymentMethod" && (
                <span className="text-xs text-red-400">{error.message}</span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Place Order
            </Button>
          </form>
        </div>
        <div className=" rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-key-foreground">Subtotal</span>
              <span>Rs {total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-key-foreground">Shipping</span>
              <span>Rs {shippingDetails.shipping_fee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-key-foreground">Discount</span>
              <span className="text-green-500">-Rs 0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-key-foreground">Delivery Time:</span>
              <span className="">{shippingDetails.delivery_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-key-foreground">Return Policy</span>
              <span className="">{shippingDetails.return_policy}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span className="text-key-foreground">Total</span>
              <span>Rs {total + Number(shippingDetails.shipping_fee)}</span>
            </div>
            <div className="space-y-2">
              {products.map((product: any) => (
                <div key={product.id} className="flex items-center gap-2">
                  <Image
                    src={product.image}
                    alt="Product Image"
                    width={1000}
                    height={1000}
                    className="h-20 w-20 rounded-md"
                  />
                  <div>
                    <h3 className="font-medium line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Quantity: {product.quantity}
                    </p>
                    <div className="ml-auto font-bold ">Rs {product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
