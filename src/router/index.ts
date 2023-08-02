import express from 'express'
import userRouter from './modules/user'
import postRouter from './modules/post'
import historyRouter from './modules/history'
import chatRouter from './modules/chat'

const router = express.Router()

router.use('/user', userRouter)

router.use('/post', postRouter)

router.use('/history', historyRouter)

router.use('/chat', chatRouter)

export default router
