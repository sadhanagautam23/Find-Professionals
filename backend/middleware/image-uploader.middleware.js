import multer from 'multer';
import cloudinary from '../config/cloudinary.config.js';

const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: {filesize: 5 * 1024 * 1024}, // 5MB
    fileFilter: (_req, file, next) => {
        const ok = ['image/jpeg', 'image/png'].includes(file.mimetype); // ✅ fixed property
        console.log('File type ok?', ok, 'MIME:', file.mimetype);

        if (ok) {
            next(null, true); // accept file
        } else {
            next(new Error('Only JPEG and PNG files are allowed'), false); // reject file
        }
    }
})

export function uploadBufferToCloudinary(buffer, options = {}) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', ...options },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
}