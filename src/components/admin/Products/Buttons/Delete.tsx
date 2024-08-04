"use client";
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'
import { BiTrash } from 'react-icons/bi'

export default function Delete({ productID }: any) {
    const router = useRouter()

    async function DeleteProduct(id: any) {
        const response = await axios.delete(`/products/deleteProduct?id=${id}`);
        if (response.status === 200) {
            router.refresh();
        }
        else{
            redirect("/not-found")
        }   

    }

    return (
        <Button size="icon" variant="outline" onClick={() => {
            const answer = confirm('Are you sure you want to delete this product?');
            if (answer) {
                DeleteProduct(productID);
            } else return;
        }
        }>
            <BiTrash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
        </Button >
    )
}
