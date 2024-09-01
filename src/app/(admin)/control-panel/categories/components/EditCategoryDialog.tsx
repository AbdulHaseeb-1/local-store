"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { useCategories } from "@/Context/Categories";
import { UploadButton } from "@/components/uploadthings";
import { useToast } from "@/Context/toast";
import { useUI } from "@/Context/UI";
import { UIContextType } from "@/types/ui";
import { log } from "console";

export default function EditCategoryDialog({
  open,
  onClose,
  categoryData,
}: any) {
  const [category, setCategory] = useState({
    categoryId: categoryData.categoryId,
    categoryName: categoryData.categoryName,
    description: categoryData.description,
    prevImagePublicId: categoryData.imagePublicId,
    icon: null,
  });
  const { setCategories }: any = useCategories();
  const { isSubmitAble, setIsSubmitAble, setIsSubmitting, isSubmitting } =
    useUI() as UIContextType;
  const { showToast } = useToast();

  useEffect(() => {
    setIsSubmitAble(!!(category.categoryName && category.description));
  }, [category, setIsSubmitAble]);

  const handleChange = useCallback(
    (e: any) => {
      const { name, value, type } = e.target;
      if (type === "file") {
        const file = e.target.files[0];
        setCategory((prevState: any) => ({
          ...prevState,
          [name]: file,
        }));
      } else {
        setCategory((prevState: any) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    [setCategory]
  );

  const readIconAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to read icon"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  async function handleSubmit() {
    setIsSubmitting(true);
    if (!category.categoryName || !category.description) {
      showToast("Category Name is required.", "error", 5000);
      return;
    }

    try {
      const form = new FormData();
      form.set("categoryId", category.categoryId);
      form.set("categoryName", category.categoryName);
      form.set("description", category.description);

      if (category.icon) {
        const base64Icon = await readIconAsBase64(category.icon); // Await reading the icon
        form.set("icon", JSON.stringify(base64Icon)); // Set the icon after reading is complete
        form.set("prevImagePublicId", category.prevImagePublicId);
      }

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
        onClose();
        setIsSubmitting(false);
        showToast(response.data.message, "success", 5000);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Error updating category:", error);
      showToast(error.message, "error", 5000);
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
            <div className="flex gap-4 text-center">
              <Label htmlFor="image" className="my-auto text-right  w-20">
                Image
              </Label>
              <Input
                type="file"
                accept=".png,.jpg,.jpeg"
                name="icon"
                onChange={handleChange}
              />
            </div>
            <p className="opacity-40 text-xs mt-1 ">
              Please Choose an image if you want to replace older one else keep
              it empty
            </p>
          </div>
          {/* Additional form fields as needed */}
          <div className="mt-4">
            <Button
              type="submit"
              disabled={!isSubmitAble || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Save Category"}
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
