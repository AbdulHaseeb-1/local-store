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
import React from "react";
import { BiEdit } from "react-icons/bi";

export default function EditShippingInfo({
    delivery_time,
    return_policy
}: {
    delivery_time:string,
    return_policy:string
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
                Delivery Info
              </Label>
              <Input
                id="delivery_info"
                name="delivery_info"
                value={delivery_time}
                //      value={newCategory.name || ""}
                //      onChange={handleInputChange}
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
                value={return_policy}
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
