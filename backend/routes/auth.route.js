import {Router} from "express";

const router = Router();
import {register} from '../controllers/auth.controller.js';
import {login} from '../controllers/auth.controller.js'; 
import {getAllUsers,searchUsers,profileSetup, profile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {upload} from '../middleware/image-uploader.middleware.js';

import { uploadPrifilePicture } from '../controllers/profilepicture.controller.js';



router.post('/register', register);
router.post('/login', login);
router.post('/userProfile',authMiddleware, profileSetup);
router.get('/getAllUsers',authMiddleware,getAllUsers);
router.get('/searchUsers',authMiddleware,searchUsers);
router.get('/profile/:id',authMiddleware,profile);
router.put('/profile/:id',authMiddleware,profile);
router.patch('/uploadProfilePic',authMiddleware, upload.single('image'), uploadPrifilePicture);
 

export default router;
