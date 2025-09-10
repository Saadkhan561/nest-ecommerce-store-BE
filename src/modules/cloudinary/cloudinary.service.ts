import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async UploadFile(upload: {
    folderName: string;
    file: Express.Multer.File;
  }): Promise<{ url: string } | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: upload.folderName }, (error, result) => {
          if (error) return reject(error);
          resolve({ url: result.secure_url });
        })
        .end(upload.file.buffer);
    });
  }
}
