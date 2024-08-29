"use server";
import prisma from "@/lib/prismaClient";

export async function getAttributes() {
   const data =  await prisma.special_attributes.findFirst({
        select:{
            shipping_fee:true,
            delivery_time:true,
            return_policy:true,
        }
    })
    return data;
}
