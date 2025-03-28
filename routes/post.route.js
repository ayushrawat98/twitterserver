import { Router } from "express";
import * as PostController from '../controllers/post.controller.js'
import { robot9000 } from "../middlewares/robot9000.js";
import { upload } from "../middlewares/multer.js";
import { compressImage } from "../middlewares/compressimage.js";
import authenticateToken from "../middlewares/authenticate.js";

const router = Router()
router.get('/notifications', authenticateToken, PostController.getNotifications)
router.post('/:username/post', PostController.getAllUserPosts)
router.post('/:username/post/:id', PostController.getUserPostById)
router.post('/post/like', PostController.likePost)
router.post('/post/repost', PostController.Repost)
router.post('/post/bookmark', PostController.Bookmark)
router.post('/post/:page', PostController.getAllPosts)
router.post('/post',authenticateToken, upload.single('file'), robot9000,  compressImage, PostController.addNewPost)



export { router }