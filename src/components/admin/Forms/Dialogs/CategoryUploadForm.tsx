"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/Context/Categories";
import axios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { UploadButton } from "@/components/uploadthings";

interface Category {
  name: string;
  description: string;
}

export default function CategoryUploadForm() {
  // * =========== States ===============
  const { categories, setCategories }: any = useCategories();
  const { showModal, setShowModal, setNewCategory, newCategory }: any =
    useCategories();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsSubmitAble(
      !!(newCategory.name && newCategory.description && uploadedImageUrl)
    );
  }, [newCategory, uploadedImageUrl]);

  // * ============ Changes ====================
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewCategory((prevState: Category) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setNewCategory]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setNewCategory({ name: "", description: "", imageUrl: "" });
    setUploadedImageUrl("");
    setImageName("");
  }, [setShowModal, setNewCategory]);

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("description", newCategory.description);
      formData.append("imageUrl", newCategory.imageUrl);
      const response = await axios.post("/categories/addCategory", formData);

      const category = JSON.parse(response.data.category);

      if (response.status === 200) {
        setIsSubmitting(false);
        toast({
          title: "Success",
          description: "Category added successfully",
          className: "text-white bg-green-600",
        });
        setCategories([...categories, category]);
        handleCloseModal();
      }
    } catch (e) {
      setIsSubmitting(false);
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to add category",
        className: "text-white bg-red-600",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the details for the new category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSaveCategory} encType="multipart/form-data">
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
                  setNewCategory((prevState: Category) => ({
                    ...prevState,
                    imageUrl: imageUrl,
                  }));
                  setUploadedImageUrl(imageUrl); // Track uploaded image URL
                  setImageName(res[0].name);
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: "Upload Error",
                    description: `Failed to upload image: ${error.message}`,
                    className: "text-white bg-red-600",
                  });
                }}
              />
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex gap-3 justify-end">
            {/* <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button> */}
            <Button type="submit" disabled={!isSubmitAble || isSubmitting}>
              {!isSubmitting ? "Save Category" : "Submitting..."}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
