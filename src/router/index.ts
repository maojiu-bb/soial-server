import express from 'express'
import userRouter from './modules/user'

const router = express.Router()

router.use('/user', userRouter)

export default router
