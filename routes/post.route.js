import { Router } from "express";
import * as PostController from '../controllers/post.controller.js'
import { robot9000 } from "../middlewares/robot9000.js";
import { upload } from "../middlewares/multer.js";
import { compressImage } from "../middlewares/compressimage.js";
import authenticateToken from "../middlewares/authenticate.js";
import authorizeUser from "../middlewares/authorize.js";

const router = Router()
// router.get('/notifications', authenticateToken, PostController.getNotifications)
router.get('', authorizeUser , PostController.getAllPosts)
//robot9000 after multer because we can't see the req.body until multer parse it
router.post('',authenticateToken, upload.single('file'), robot9000,  compressImage, PostController.addNewPost)
router.post('/like', PostController.likePost)
router.post('/repost', PostController.Repost)
router.post('/bookmark', PostController.Bookmark)
router.get('/delete', PostController.deletePost)
// router.post('/:username/post', PostController.getAllUserPosts)
router.get('/:id',authorizeUser, PostController.getPostById)
router.get('/:username/posts',authorizeUser, PostController.getAllUserPosts)





export { router }