import express from 'express'
import userRouter from './modules/user'
import postRouter from './modules/post'

const router = express.Router()

router.use('/user', userRouter)

router.use('/post', postRouter)

export default router
