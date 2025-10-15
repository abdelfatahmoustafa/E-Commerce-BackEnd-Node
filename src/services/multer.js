import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.config.js";

function Upload(folderPath) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "e-commerce/" + folderPath,
      allowed_formats: ["jpg", "jpeg", "png"],
      background_removal: "cloudinary_ai",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
  });

  return multer({ storage });
}

export default Upload;
