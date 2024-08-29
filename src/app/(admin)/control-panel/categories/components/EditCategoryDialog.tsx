"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useCategories } from "@/Context/Categories";

export default function EditCategoryDialog({
  open,
  onClose,
  categoryData,
}: any) {
  const [category, setCategory] = useState({
    categoryId: categoryData.categoryId,
    categoryName: categoryData.categoryName,
    description: categoryData.description,
    prevIconURL: categoryData.imageUrl,
    categoryIcon: "",
  });
  const { setCategories }: any = useCategories();
  const { toast: t } = useToast();

  function toast(title: string, description: string, variant: string) {
    t({
      className: cn(
        "top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white ",
        variant == "success" ? "bg-green-700" : "bg-red-600"
      ),
      title,
      description,
    });
  }

  function handleChange(e: ChangeEvent<any>) {
    const { name, value, type } = e.target;

    if (type == "file") {
      if (e.target.files.length === 0) {
        setCategory((prev: any) => ({ ...prev, [name]: null }));
      } else {
        const file = e.target.files[0];
        setCategory((prev: any) => ({ ...prev, [name]: file }));
      }
    }
    setCategory((prev: any) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!category.categoryName) {
      toast("Error", "Category Name is required.", "error");
      return;
    }

    const form = new FormData();
    form.set("categoryId", category.categoryId);
    form.set("categoryName", category.categoryName);
    form.set("description", category.description);
    form.set("categoryIcon", category.categoryIcon);

    try {
      const response = await axios.put("/categories/editCategory", form);

      if (response.status === 200) {
        const updatedCategory = JSON.parse(response.data.data);
        setCategories((prevCategories: any) =>
          prevCategories.map((c: any) => {
            return c.categoryId == updatedCategory.categoryId
              ? updatedCategory
              : c;
          })
        );

        toast("Success", response.data.message, "success");

        onClose();
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast("Error", "Failed to update category. Please try again.", "error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category: {category?.categoryName}</DialogTitle>
          <DialogDescription>
            Modify the details of the category below.
          </DialogDescription>
        </DialogHeader>
        {/* Your form or inputs for editing the category would go here */}
        <form>
          <div className="mb-4">
            <Label className="font-bold mb-2 block">Category Name</Label>
            <Input
              type="text"
              defaultValue={category?.categoryName}
              name="categoryName"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <Label className="font-bold mb-2 block">Description</Label>
            <Textarea
              defaultValue={category?.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <Label className="font-bold mb-2 block">Category Icon</Label>
            <Input type="file" name="categoryIcon" onChange={handleChange} />
            <p className="opacity-40 text-xs mt-1 ">
              Please Choose an image if you want to replace older one else keep
              it empty
            </p>
          </div>
          {/* Additional form fields as needed */}
          <div className="mt-4">
            <Button type="button" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant={"secondary"} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
