import { Router } from "express";
import * as UserController from '../controllers/user.controller.js'
import { robot9000 } from "../middlewares/robot9000.js";
import { upload } from "../middlewares/profileMulter.js";
import { compressImage } from "../middlewares/compressimage.js";
import authenticateToken from "../middlewares/authenticate.js";
import authorizeUser from "../middlewares/authorize.js";

const router = Router()
router.get('/notifications', authenticateToken, UserController.getNotifications)
router.get('/delete', UserController.deleteUser)
router.post('/details',authenticateToken, upload.single('file'),  compressImage, UserController.addUserDetails)
router.get('/:username/details', UserController.getUserDetails)

export { router }