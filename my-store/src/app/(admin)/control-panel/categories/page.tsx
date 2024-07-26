"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { PlusIcon } from "@radix-ui/react-icons"
import CategoryUploadForm from "@/components/admin/Forms/CategoryUploadForm"
import { useCategories } from "@/Context/Categories"


export default function Component() {
    const { showModal, setShowModal, categories }: any = useCategories();
    // * ==========================================

    // * ==========================================

    const handleAddCategory = () => {
        setShowModal(true);
    };

    // * ==========================================


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Button onClick={handleAddCategory}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Category
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category: any) => (
                    <Card key={category.categoryId} className="p-4">
                        <Image priority={true} src={category.imageUrl} alt={category.categoryName} width={80} height={80} className="w-auto h-auto *:mb-4" />
                        <h3 className="text-lg font-bold">{category.categoryName}</h3>
                        <p className="text-muted-foreground">{category.description}</p>
                    </Card>
                ))}
            </div>
            <CategoryUploadForm />
        </div>
    );
}
