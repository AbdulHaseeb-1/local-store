import { writeFile } from "fs";
import path from "path";

  // Function to save image to file
export async function saveImage(imageData: any) {
    try {
      const buffer: any = Buffer.from(await imageData.arrayBuffer());
      const now = new Date();
      const filename = `image_${now.getTime()}_${Math.random().toString(30)}`;
      const imagePath = "/images/products/" + filename + ".png";
      writeFile(
        path.join("public/images/products/" + filename + ".png"),
        buffer,
        (err) => {
          if (err) {
            console.error("Error saving image:", err);
            throw new Error("Failed to save image");
          } else {
            console.log("Image saved:", filename);
          }
        }
      );
      return imagePath;
    } catch (err) {
      console.error("Error saving image:", err);
      throw new Error("Failed to save image");
    }
  }
  
  
  