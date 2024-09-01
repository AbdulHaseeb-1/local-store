"use client";
import React, { useCallback, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/Context/toast";
import { useUI } from "@/Context/UI";
import { UIContextType } from "@/types/ui";

interface Category {
  name: string;
  description: string;
  icon: File | null;
}

const CategoryUploadForm: React.FC = () => {
  // * =========== State and Context ===============
  const {
    setCategories,
    showModal,
    setShowModal,
    setNewCategory,
    newCategory,
  } = useCategories() as any;
  const { isSubmitAble, setIsSubmitAble, isSubmitting, setIsSubmitting } =
    useUI() as UIContextType;
  const { showToast } = useToast();

  // * ========== Effects ==========
  useEffect(() => {
    const isFormValid = !!(
      newCategory.name &&
      newCategory.description &&
      newCategory.icon
    );
    setIsSubmitAble(isFormValid);
  }, [newCategory, setIsSubmitAble]);

  // * ========== Handlers ==========
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      if (type === "file" && e.target instanceof HTMLInputElement) {
        const file = e.target.files?.[0] || null;
        setNewCategory((prevState: Category) => ({
          ...prevState,
          [name]: file,
        }));
      } else {
        setNewCategory((prevState: Category) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    [setNewCategory]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setNewCategory({ name: "", description: "", icon: null });
  }, [setShowModal, setNewCategory]);

  const handleSaveCategory = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("description", newCategory.description);

      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            formData.append("icon", JSON.stringify(reader.result));
   
            const response = await axios.post(
              "/categories/addCategory",
              formData
            );
            if (response.status === 200) {
              handleCloseModal();
              const category = JSON.parse(response.data.category);
              setCategories((prevCategories: Category[]) => [
                ...prevCategories,
                category,
              ]);
              showToast("Category added successfully", "success", 5000);
            } else {
              throw new Error(
                response.data.message || "Failed to add category"
              );
            }
          } catch (error: any) {
            showToast(
              error.response?.data?.message ||
                error.message ||
                "Unexpected error occurred",
              "error",
              5000
            );
          } finally {
            setIsSubmitting(false);
          }
        };
        reader.readAsDataURL(newCategory.icon!);
      } catch (error: any) {
        showToast(
          error.response?.data?.message ||
            error.message ||
            "Unexpected error occurred",
          "error",
          5000
        );
        setIsSubmitting(false);
      }
    },
    [newCategory, setCategories, showToast, setIsSubmitting, handleCloseModal]
  );

  // * ========== Render ==========
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="flex gap-4 text-center">
              <Label htmlFor="image" className="my-auto text-right w-20">
                Image
              </Label>
              <Input
                type="file"
                accept=".png,.jpg,.jpeg"
                name="icon"
                onChange={handleChange}
              />
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex gap-3 justify-end">
            <Button type="submit" disabled={!isSubmitAble || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUploadForm;
