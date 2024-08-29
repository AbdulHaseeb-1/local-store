import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const invoices = [
    {
        id: "03",
        image: "/images/product/product-01.png",
        title: "Product Title",
        totalAmount: "$350.00",
        sold: "100",
    },
    {
        id: "03",
        image: "/images/product/product-02.png",
        title: "Product Title",
        totalAmount: "$350.00",
        sold: "100",
    },
    {
        id: "03",
        image: "/images/product/product-03.png",
        title: "Product Title",
        totalAmount: "$350.00",
        sold: "100",
    },
]


export default function TopProducts() {
    return (
        <>
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <h1 className="text-2xl font-semibold  mr-4">Top Products</h1>
            </header>
            < Table >
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Serial</TableHead>
                        {/* <TableHead>Image</TableHead> */}
                        <TableHead>Title</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Sold</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-bold">{invoice.id}</TableCell>
                            {/* <TableCell><Image src={invoice.image} alt="" width={48} height={48} className="w-auto h-auto" /></TableCell> */}
                            <TableCell className="font-medium">{invoice.title}</TableCell>
                            <TableCell>{invoice.totalAmount}</TableCell>
                            <TableCell className="text-right">{invoice.sold}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table >
        </>
    )

}

