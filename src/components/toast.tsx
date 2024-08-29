"use client";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Description } from "@radix-ui/react-toast";

export default function Toast(
  title: string,
  description: string,
  variant: string
) {
  const { toast } = useToast();
  let color = "";
  switch (variant) {
    case "success":
      color = "bg-green-600";
      break;
    case "error":
      color = "bg-red-600";
      break;
    case "warning":
      color = "bg-warning-600";
      break;
    default:
      color = "bg-blue-600";
      break;
  }

  toast({
    className: cn(
      `top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white`,
      color
    ),
    title: title,
    description: description,
  });
  return null;
}
