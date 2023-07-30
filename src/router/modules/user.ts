import express from 'express'
import {
  handleLoginEmail,
  handleLoginUser,
  handleRegister
} from '../handles/user'

const userRouter = express.Router()

// 注册请求
userRouter.post('/register', handleRegister)

// 用户名密码登录
userRouter.post('/loginUser', handleLoginUser)

// 邮箱密码登录
userRouter.post('/loginEmail', handleLoginEmail)

export default userRouter
