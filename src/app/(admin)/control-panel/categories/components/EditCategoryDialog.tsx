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
import { useCategories } from "@/Context/Categories";
import { UploadButton } from "@/components/uploadthings";
import { useToast } from "@/Context/toast";

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
    imageUrl: "",
  });
  const { setCategories }: any = useCategories();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsSubmitAble(
      !!(category.categoryName && category.description )
    );
  }, [category]);

  function handleChange(e: ChangeEvent<any>) {
    const { name, value, type } = e.target;
    setCategory((prev: any) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!category.categoryName || !category.description) {
      showToast("Category Name is required.", "error", 5000);
      return;
    }

    const form = new FormData();
    form.set("categoryId", category.categoryId);
    form.set("categoryName", category.categoryName);
    form.set("description", category.description);
    form.set("imageUrl", category.imageUrl);

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
        showToast(response.data.message, "success", 5000);
        onClose();
      }
    } catch (error: any) {
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
              <UploadButton
                appearance={{
                  container: "",
                  button: "px-6 bg-primary",
                  allowedContent: "text-blue-400",
                }}
                content={{
                  allowedContent({ isUploading }) {
                    return isUploading
                      ? "Uploading..."
                      : imageName || "Allowed : PNG,JPG";
                  },
                }}
                endpoint="categoryImageUploader"
                onClientUploadComplete={(res) => {
                  const imageUrl = res[0].url; // Assuming res is an array and has the URL
                  setCategory((prevState: any) => ({
                    ...prevState,
                    imageUrl: imageUrl,
                  }));
                  setUploadedImageUrl(imageUrl); // Track uploaded image URL
                  setImageName(res[0].name);
                }}
                onUploadError={(error: Error) => {
                  showToast(`Failed to upload image: ${error.message}`, "error", 5000);
                }}
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
              type="button"
              onClick={handleSubmit}
              disabled={!isSubmitAble}
            >
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
