"use client"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { BsArrowLeft } from "react-icons/bs"
import { BiChevronLeft, BiChevronRight, BiTrash } from "react-icons/bi"
import axios from "@/lib/axios"

export default function Component({ params }: { params: { order_id: string } }) {
  const [order, setOrder]: any = useState({});

  useEffect(() => {
    async function getOrder() {
      const response = await axios.get(`/orders/orderDetails?order_id=${params.order_id}`)
      const order = JSON.parse(response.data);
      console.log(order)
      setOrder(order);
    }
    getOrder();
  }, [params])


  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">View detailed information about a specific order.</p>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-lg font-bold">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order && order.order_items && order.order_items.map((item: any,index:number) =>
                      <TableRow key={item.order_item_id}>
                        <TableCell className="hidden md:table-cell">
                          <Image
                            src={item.products.images[0].image_url}
                            width="64"
                            height="64"
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium ">{item.products.product_title}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>Rs {item.total_price}</TableCell>
                        {/* <TableCell className="hidden md:table-cell">
                          <Button variant="outline" size="icon">
                            <BiTrash className="w-5 h-5" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="text-lg font-bold">Order Summary</h3>
                <div className="grid gap-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>Subtotal</div>
                    <div>Rs {order.total_amount}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Shipping</div>
                    <div>Rs 200</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-bold">
                    <div>Total</div>
                    <div>Rs {Number(order.total_amount) + 200}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm">Collect payment</Button>
                  <Button variant="outline" size="sm">
                    Send invoice
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            {/* <Button variant="secondary" className="ml-auto">
              Edit
            </Button> */}
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid gap-1">
              {/* <Link href="#" className="text-blue-600 underline" prefetch={false}> */}
              {order.customer}
              {/* </Link> */}
              {/* <div>23 total orders</div> */}
            </div>
          </CardContent>
          <Separator />
          <div>
            <CardHeader>
              <CardTitle>Contact information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid gap-1">
                {/* <Link href="#" className="text-blue-600" prefetch={false}>
                  olivia@example.com
                </Link> */}
                <div className="text-muted-foreground">{order.phone}</div>
              </div>
            </CardContent>
          </div>
          <Separator />
          <div>
            <CardHeader>
              <CardTitle>Shipping address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div>
                {order.order_address && order.order_address.address}
                <br />
                {order.order_address && order.order_address.city}
                <br />
                {order.order_address && order.order_address.state}
              </div>
            </CardContent>
          </div>
          {/* <Separator /> */}
          {/* <div> */}
          {/* <CardHeader>
              <CardTitle>Billing address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">Same as shipping address</CardContent>
          </div> */}
        </Card>
      </div>
    </div>
  )
}

