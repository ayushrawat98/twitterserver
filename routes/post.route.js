import { Router } from "express";
import * as PostController from '../controllers/post.controller.js'
import { robot9000 } from "../middlewares/robot9000.js";

const router = Router()

router.get('/posts', PostController.getAllPosts)
router.get('/:username/posts', PostController.getAllUserPosts)
router.get('/:username/post/:id', PostController.getUserPostById)

router.post('/post', robot9000, PostController.addNewPost)

export { router }