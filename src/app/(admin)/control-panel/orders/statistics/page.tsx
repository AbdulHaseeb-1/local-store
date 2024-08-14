"use client";
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BiPackage } from 'react-icons/bi'
import { FaDollarSign } from 'react-icons/fa'
import { BsTruck } from 'react-icons/bs'
import { CiLock } from 'react-icons/ci'
import { LuListOrdered } from 'react-icons/lu'
import axios from '@/lib/axios';
import Pagination from '@/components/paginate';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [sortColumn, setSortColumn] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [perPage, setPerPage] = useState(10); // Products per page
    const [totalPages, setTotalPages] = useState(1); // Total pages (initially set to 1)
    const [totalOrders, setTotalOrders] = useState(0); // Total pages (initially set to 1)
    const router = useRouter();

    useEffect(() => {
        async function getOrders() {
            const response = await axios.get(`/orders?perPage=${perPage}&currentPage=${currentPage}`);
            const parsed = JSON.parse(response.data);
            const { orders, totalPages, totalOrders } = parsed;
            setOrders(orders);
            setTotalPages(totalPages);
            setTotalOrders(totalOrders);
        }
        getOrders();


    }, [currentPage, perPage])


    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const handlePerPageChange = (itemsPerPage: any) => {
        setPerPage(itemsPerPage);
    }


    // Function to format the SQL date
    const formatDate = (sqlDate: string) => {
        const date = new Date(sqlDate);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(date);
    };

    const handleRowClick = (orderId: string) => {
        router.push(`/control-panel/orders/orderDetails/${orderId}`);
    };

    return (
        <div className="p-6 ">
            <div className="mb-6 md:mb-10">
                <h1 className="text-2xl font-bold">Orders</h1>
                <p className="text-muted-foreground">A summary of your recent orders and their status.</p>
            </div>
            <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Total Orders</CardTitle>
                            <BiPackage size={30} className=" text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{totalOrders}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Paid Orders</CardTitle>
                            <FaDollarSign  size={30} className=" text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{0}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Shipped Orders</CardTitle>
                            <BsTruck  size={30} className=" text-orange-600"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">0</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Unfulfilled Orders</CardTitle>
                            <CiLock  size={30} className=" text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">
                                0
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle className='text-2xl'>Recent Orders</CardTitle>
                        <div className="flex items-center gap-2">
                            <Input
                                type="search"
                                placeholder="Search orders..."
                                className="bg-muted px-3 py-2 rounded-md text-sm"
                            // onChange={handleFilter}
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <LuListOrdered className="w-5 h-5" />
                                        <span className="sr-only">Sort orders</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                    //  value={sortColumn} onValueChange={handleSort}
                                    >
                                        <DropdownMenuRadioItem value="id">Order Number</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="date">Order Date</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="total">Total</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="hidden md:table-cell">Date</TableHead>
                                    <TableHead className="text-right">Total {"(Rs)"}</TableHead>
                                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders && orders.map((order: any, index: number) => (
                                    <TableRow
                                        key={order.order_id}
                                        className={`${index % 2 === 0 ? "bg-muted/20" : "bg-muted/10"}`}
                                        onClick={() => handleRowClick(order.order_id)}
                                    >
                                        <TableCell className="font-medium">{order.order_id}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell className="hidden md:table-cell">{formatDate(order.order_date)}</TableCell>
                                        <TableCell className="text-right">{order.total_amount}</TableCell>
                                        <TableCell
                                            className={`hidden sm:table-cell`}
                                        >
                                            <span className={`py-1 px-2 rounded-full
                                                 ${order.order_status === "Pending"
                                                    ? "text-yellow-500 bg-yellow-400 bg-opacity-10"
                                                    : order.order_status === "Confirmed"
                                                        ? "text-sky-500 bg-sky-500 bg-opacity-10"
                                                        : order.order_status === "Shipped" ?
                                                            "text-blue-500 bg-blue-500 bg-opacity-10"
                                                            : order.order_status === "Delivered" ?
                                                                "text-green-500 bg-green-500 bg-opacity-10"
                                                                : "text-red-500 bg-red-500 bg-opacity-10"
                                                }
                                                        
                                                        `}>
                                                {order.order_status}
                                            </span>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        <div className='pt-4'>
                            <Pagination onPageChange={handlePageChange} onPerPageChange={handlePerPageChange} totalPages={totalPages} currentPage={currentPage} perPage={perPage} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

