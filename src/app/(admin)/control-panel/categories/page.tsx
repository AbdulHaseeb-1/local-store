"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";
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
import { useToast } from "@/Context/toast";
import CategorySkeleton from "@/components/skeletons/category";

export default function Component() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { showModal, setShowModal, categories, setCategories }: any =
    useCategories();
  const { showToast } = useToast();
  // * ==========================================

  // * ==========================================

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios("/categories");
        const responseCategories = JSON.parse(response.data.json);
        setCategories(responseCategories);
      } catch (err: any) {
        showToast(err.message, "error", 5000);
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

  async function ConfirmDelete(categoryId: number, imagePublicId: string) {
    const isConfirm = confirm(
      "Deleting this category will also remove all products related to this category. Are you sure you want to delete?"
    );
    if (isConfirm) {
      try {
        const response = await axios.delete("/categories/modifyCategory", {
          data: {
            categoryId,
            imagePublicId,
          },
        });
        const message = response.data.message;
        if (response.status === 200) {
          const filtered = categories.filter(
            (category: any) => category.categoryId !== categoryId
          );
          setCategories(filtered);
          showToast(message, "success", 5000);
        } else {
          showToast(message, "error", 5000);
        }
      } catch (err: any) {
        showToast(err.message, "error", 5000);
      }
    }
  }

  async function ConfirmDisable(categoryId: number, isActive: boolean) {
    const isConfirm = isActive
      ? confirm(
          "Disabling this category will also disable all products related to this category. Are you sure you want to disable?"
        )
      : confirm(
          "Enabling this category will also enable all products related to this category. Are you sure you want to enable?"
        );

    if (isConfirm) {
      try {
        const response = await axios.put("/categories/modifyCategory", {
          data: {
            categoryId,
            isActive,
          },
        });
        const message = response.data.message;
        const updatedCategory = JSON.parse(response.data.updatedCategory);

        setCategories((prevCategories: any) =>
          prevCategories.map((c: any) => {
            return c.categoryId == updatedCategory.categoryId
              ? updatedCategory
              : c;
          })
        );
        if (response.status === 200) {
          showToast(message, "success", 5000);
        } else {
          showToast(message, "error", 5000);
        }
      } catch (err: any) {
        showToast(err.message, "error", 5000);
      }
    }
  }

  // * ==========================================

  if (categories == null) {
    return <CategorySkeleton />;
  } else if (categories.length == 0) {
    return (
      <div className="flex flex-col justify-center items-center h-52 ">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <p className="text-2xl">Nothing found 😐 </p>
          <Button onClick={handleAddCategory} className="w-44 bg-primary-gradient">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
        <CategoryUploadForm />
      </div>
    );
  } else
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Button onClick={handleAddCategory} className="bg-primary-gradient">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category: any) => (
            <Card
              key={category.categoryId}
              className="relative p-4 dark:bg-neutral-900 bg-neutral-50"
            >
              <div className="absolute right-2 top-2  ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="grid place-content-center  h-8 w-8 hover:bg-secondary rounded-full">
                    <IoMdMore size={22} />
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
                      className=""
                      onClick={() => {
                        ConfirmDisable(category.categoryId, category.is_active);
                      }}
                    >
                      {category.is_active ? "Disable" : "Enable"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-700"
                      onClick={() => {
                        ConfirmDelete(
                          category.categoryId,
                          category.imagePublicId
                        );
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
