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
export default function EditShippingInfo({
  shippingFee,
  onClose,
  open,
  setAttributes,
}: {
  shippingFee: number;
  onClose: () => void;
  open: React.ComponentState;
  setAttributes: React.SetStateAction<any>;
}) {
  const [form, setForm] = useState({
    shippingFee,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    // Check if shippingFee is valid to enable submission
    setIsSubmitAble(!!form.shippingFee);
  }, [form.shippingFee]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put("/attributes/editShippingInfo", form);
      if (response.status === 200) {
        setAttributes((prev: any) => ({
          ...prev,
          shipping_fee: response.data.updatedInfo.shipping_fee,
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
          {/* Use onSubmit for form submission */}
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="shippingFee" className="text-right">
                Shipping Fee
              </Label>
              <Input
                type="number"
                id="shippingFee"
                name="shippingFee"
                value={form.shippingFee}
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
