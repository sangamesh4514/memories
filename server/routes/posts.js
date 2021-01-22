import express from 'express'
import { getPost,createPost,updatePost,deletePost,likePost} from '../controller/posts.js'
import auth from '../middleware/auth.js'

const router=express.Router()

router.get('/',getPost)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/like',auth,likePost)


export default router