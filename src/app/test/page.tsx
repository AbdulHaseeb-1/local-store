"use client";
import axios from "@/lib/axios";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileInput(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!fileInput) return; // Ensure a file is selected

    const formData = new FormData();
    formData.append("file", fileInput);
    setUploading(true);

    try {
      const res = await axios.post("/cloudinary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      
      const data = res.data;
      setImageUrl(data.url); // Use the URL from the response
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {imageUrl && (
        <div>
          <h4>Uploaded Image:</h4>
          <Image src={imageUrl} alt="Uploaded" width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
