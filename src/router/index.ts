import express from 'express'
import userRouter from './modules/user'
import postRouter from './modules/post'
import historyRouter from './modules/history'

const router = express.Router()

router.use('/user', userRouter)

router.use('/post', postRouter)

router.use('/history', historyRouter)

export default router
