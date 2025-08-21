import User from '../models/user.model.js';
import { uploadBufferToCloudinary } from '../middleware/image-uploader.middleware.js';
import cloudinary from '../config/cloudinary.config.js';

export const uploadPrifilePicture = async (req, res) => {
  try {
    if (!req.file) throw new Error('No file uploaded');

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder: 'profile_pictures',
      public_id: `profile_${req.user.userId}`, // ✅ use userId
      transformation: [
        { width: 1600, height: 1600, crop: 'fill', gravity: 'auto' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
    });

    console.log('req.user:', req.user);

    const user = await User.findByIdAndUpdate(
      req.user.userId, // ✅ use userId here
      {
        profilePicture: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      image: user.profilePicture,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
