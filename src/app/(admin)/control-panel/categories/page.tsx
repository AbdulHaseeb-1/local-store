"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { DropdownMenuIcon, PlusIcon } from "@radix-ui/react-icons";
import CategoryUploadForm from "@/components/admin/Forms/Dialogs/CategoryUploadForm";
import { useCategories } from "@/Context/Categories";
import axios from "@/lib/axios";
import { IoMdMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCategoryDialog from "./components/EditCategoryDialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function Component() {
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { showModal, setShowModal, categories, setCategories }: any =
    useCategories();
  const { toast } = useToast();
  // * ==========================================

  // * ==========================================

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios("/categories");
        const responseCategories = JSON.parse(response.data.json);
        setCategories(responseCategories);
      } catch (err) {
        setError("Something went wrong");
      }
    }
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  async function ConfirmDelete(categoryId: number) {
    const isConfirm = confirm(
      "This will be removed permanently, click OK to continue"
    );
    if (isConfirm) {
      try {
        const response = await axios.delete("/categories/deleteCategory", {
          data: {
            categoryId,
          },
        });
        const message = response.data.message;
        if (response.status === 200) {
          const filtered = categories.filter(
            (category: any) => category.categoryId !== categoryId
          );
          setCategories(filtered);
          toast({
            className: cn(
              "top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-600 text-white"
            ),
            title: "Success",
            description: message,
          });
        } else {
          toast({
            className: cn(
              "top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-600 text-white"
            ),
            title: "Error",
            description: message,
          });
        }
      } catch (err: any) {
        toast({
          className: cn(
            "top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-600 text-white"
          ),
          title: "Success",
          description: err.message,
        });
      }
    }
  }
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
          <Card key={category.categoryId} className="relative p-4">
            <div className="absolute right-2 top-2 ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"icon"} variant={"ghost"}>
                    <IoMdMore size={22} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      handleEditCategory(category);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => {
                      ConfirmDelete(category.categoryId);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Image
              priority={true}
              src={category.imageUrl}
              alt={category.categoryName}
              width={80}
              height={80}
              className="w-auto h-auto *:mb-4"
            />
            <h3 className="text-lg font-bold">{category.categoryName}</h3>
            <p className="text-muted-foreground">{category.description}</p>
          </Card>
        ))}
      </div>
      <CategoryUploadForm />
      {editDialogOpen && (
        <EditCategoryDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          categoryData={selectedCategory}
        />
      )}
    </div>
  );
}
