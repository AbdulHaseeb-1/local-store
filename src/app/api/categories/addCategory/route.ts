import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // * Validation Admin Session
    const session = await auth();
    if (!session) {
      NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    // * Extracting FormData
    const formData = await req.formData();

    const name: any = formData.get("name");
    const description: any = formData.get("description");
    const imageUrl: any = formData.get("imageUrl");

      console.log(name,description,imageUrl);
      


    // * Validating Data
    if (!name && !description && !imageUrl) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    const result = await prisma.categories.create({
      data: {
        categoryName: name,
        description,
        imageUrl: imageUrl,
      },
    });
    // * Converting to JSON for client transfer
    const category = toJson(result);
    // * Returning Response
    return NextResponse.json({ category }, { status: 200 });
  } catch (err) {
    //* Catch Block
    console.error("Error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// *  ---------------------------------
const toJson = (param: any): string => {
  // Return type for stricter checking
  return JSON.stringify(param, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};
