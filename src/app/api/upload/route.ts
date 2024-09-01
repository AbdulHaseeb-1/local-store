import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check if the request body is of form-data type
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResponse:any = await cloudinary.uploader.upload_stream(
      { 
        upload_preset: "ml_default" // You can set custom presets in your Cloudinary dashboard
      },
      (error, result) => {
        if (error) throw new Error(error.message);
        return result;
      }
    ).end(buffer);

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
