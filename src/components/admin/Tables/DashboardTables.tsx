import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function DetailsTable() {
  return (
    <div>
      <Table className="">
        <TableCaption className="py-1">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="">Feature</TableHead>
            <TableHead className="text-right">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow className="border-none">
            <TableCell>Total Products</TableCell>
            <TableCell className="text-right">364</TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableCell>Products Online</TableCell>
            <TableCell className="text-right">233</TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableCell>Orders</TableCell>
            <TableCell className="text-right">123np</TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableCell>Average Order Value (AOV)</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sold Out</TableCell>
            <TableCell className="text-right">{364 - 233}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}