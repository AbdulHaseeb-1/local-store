"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/Context/toast";
import axios from "@/lib/axios";
import React, { FormEvent, useEffect, useState } from "react";

export default function EditShippingServices({
  delivery_info = " ",
  return_policy = " ",
  onClose,
  open,
  setAttributes,
}: {
  delivery_info: string;
  return_policy: string;
  onClose: () => void;
  open: React.ComponentState;
  setAttributes: React.SetStateAction<any>;
}) {
  const [form, setForm] = useState({
    delivery_info,
    return_policy,
  });
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!form.delivery_info || !form.return_policy) {
      setIsSubmitAble(false);
    } else {
      setIsSubmitAble(true);
    }
  }, [form]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        "/attributes/editShippingServices",
        form
      );
      if (response.status === 200) {
        setAttributes((prev: any) => ({
          ...prev,
          return_policy: response.data.updatedServices.return_policy,
          delivery_info: response.data.updatedServices.delivery_info,
        }));
        setIsSubmitting(false);
        showToast(response.data.message, "success", 5000);
        onClose(); // Close the modal after success
      }
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("Error :", error);
      showToast(error.message, "error", 5000);
    }
  }

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && onClose()} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Shipping Fee Info</DialogTitle>
          <DialogDescription>
            Fill in the details to edit shipping fee.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="title" className="text-right">
                Delivery Info
              </Label>
              <Input
                id="delivery_info"
                name="delivery_info"
                value={form.delivery_info}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="title" className="text-right">
                Return Policy
              </Label>
              <Input
                id="return_policy"
                name="return_policy"
                value={form.return_policy}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex gap-3 justify-end">
            <Button type="submit" disabled={!isSubmitAble || isSubmitting}>
              {isSubmitting ? "Saving " : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
