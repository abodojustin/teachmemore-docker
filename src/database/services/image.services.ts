import fileUpload from "express-fileupload";
import { unlink } from "fs";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const accessKey = process.env.ACCESS_KEY_ID as string;
const secretAccessKey = process.env.SECRET_ACCESS_KEY as string;
const bucket = process.env.S3_BUCKET as string;
const region = process.env.S3_REGION as string;

const client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: region,
});

//remove image from the tmp folder
function removeTmp(path: string) {
  unlink(path, (err) => {
    if (err) throw "file not removed in the tmp folder";
    console.log(`successfull deleted ${path}`);
  });
}

export const ImageService = {
  async uploadImage(
    slug: string,
    file: fileUpload.UploadedFile
  ): Promise<string> {
    try {
      if (!slug) throw new Error("Slug cannot be empty");

      if (!file) throw new Error("No file uploaded");

      if (file.size > 5 * 1024 * 1024) {
        removeTmp(file.tempFilePath);
        throw new Error("Size too large");
      }

      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        throw new Error("Unsupported file format");
      }

      const key = `${slug}/${file.name}`;
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.data,
      });

      await client.send(command);

      const imageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

      removeTmp(file.tempFilePath);
      return imageUrl;
    } catch (error: any) {
      throw error;
    }
  },
  async deleteImage(slug: string, fileName: string) {
    try {
      const key = `${slug}/${fileName}`;

      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      await client.send(command);

      return "Image deleted successfully";
    } catch (error: any) {
      throw error;
    }
  },
};
