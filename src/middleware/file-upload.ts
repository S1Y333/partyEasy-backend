import { Request } from "express";
import multer, { MulterError, Multer } from "multer";
import { v4 as uuid } from "uuid";

const MIME_TYPE_MAP: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

export const fileUpload: Multer = multer({
  //where to store and what file is acceptable
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req: Request, file: Multer.File, cb: Function) => {
      cb(null, "./uploads");
    },
    filename: (req: Request, file: Multer.File, cb: Function) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (
    req: Request,
    file: Multer.File,
    cb: (error: Error | null, isValid: boolean) => void
  ) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

export default fileUpload;
