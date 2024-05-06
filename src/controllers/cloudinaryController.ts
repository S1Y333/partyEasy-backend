import dotenv from "dotenv";
dotenv.config();
import { Request, Response, query } from "express";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//req.files.file.path

class CloudinaryController {

  static async uploadImage(request: Request, response: Response) {
    try {
      const result = await cloudinary.uploader.upload(request.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto", //jpeg,png
      });

      response.json({
        public_id: result.public_id,
       url: result.secure_url,
      });
    } catch (error) {
      console.error(error);
      //response.status(500).json({ error: "Failed to upload image" });
    }
  }
}

export default CloudinaryController;
