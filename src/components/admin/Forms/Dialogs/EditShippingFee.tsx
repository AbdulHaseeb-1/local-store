"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUI } from "@/Context/UI";
import React from "react";
import { UIContextType } from "@/types/ui";
import { BiEdit } from "react-icons/bi";

export default function EditShippingFee({
  shipping_fee,
}: {
  shipping_fee: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <BiEdit size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Shipping Fee Info</DialogTitle>
          <DialogDescription>
            Fill in the details to edit shipping fee.
          </DialogDescription>
        </DialogHeader>
        <form encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="title" className="text-right">
                Shipping Fee
              </Label>
              <Input
                id="shipping_fee"
                name="shipping_fee"
                value={shipping_fee}
                //      value={newCategory.name || ""}
                //      onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex gap-3 justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
