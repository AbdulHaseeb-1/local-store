"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useCategories } from '@/Context/Categories';
import axios from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

interface Category {
    id: number | null;
    name: string;
    description: string;
    image: File | null;
}

export default function CategoryUploadForm() {
    // * =========== States ===============
    const { categories, setCategories }: any = useCategories();
    const { showModal, setShowModal, setNewCategory, newCategory }: any = useCategories();
    const { toast } = useToast();

    // * ============ Changes ====================
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                setNewCategory((prevState: Category) => {
                    return { ...prevState, image: file }
                });
            }
        } else {
            setNewCategory((prevState: Category) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewCategory({
            id: null,
            name: "",
            description: "",
            image: null,
        });
    };

    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newCategory.name);
            formData.append('description', newCategory.description);
            if (newCategory.image) {
                formData.append('image', newCategory.image);
            }


            const response = await axios.post("/categories/addCategory", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const category = JSON.parse(response.data.category);
          
            if (response.status === 200) {
                toast({ title: "Success", description: "Category added successfully", className: "text-white bg-green-600" });
                setCategories([...categories, category]);
                handleCloseModal();
            }
            
        } catch (e) {
            console.error(e);
            toast({ title: "Error", description: "Failed to add category", className: "text-white bg-red-600" });
        }
    };

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>Fill in the details for the new category.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveCategory} encType='multipart/form-data'>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="name"
                                value={newCategory.name || ""}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={newCategory.description || ""}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                placeholder="Upload an image"
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Separator className='my-1' />
                    <div className='flex gap-3 justify-end'>
                        <Button variant="outline" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Category</Button>
                    </div>
                </form >
            </DialogContent>
        </Dialog>
    );
}
