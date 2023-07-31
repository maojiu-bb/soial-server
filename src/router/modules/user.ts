import express from 'express'
import {
  handleLoginEmail,
  handleLoginUser,
  handleRegister,
  handleUpdatePassword,
  handleLogout,
  handleForgetPassword,
  handleUpdateEmail,
  handleCancelAccount,
  handleUpdateAvatar,
  handleUpdateBackImage,
  handleUpdateUsername,
  handleUpdateIntroduction,
  handleUpdateGender,
  handleUpdateAddress,
  handleUpdateBirthday,
  handleGetInfo
} from '../handles/user'

const userRouter = express.Router()

// 注册请求
userRouter.post('/register', handleRegister)

// 用户名密码登录
userRouter.post('/loginUser', handleLoginUser)

// 邮箱密码登录
userRouter.post('/loginEmail', handleLoginEmail)

// 退出登录
userRouter.post('/logout', handleLogout)

// 忘记密码
userRouter.post('/forgetPassword', handleForgetPassword)

// 更改密码
userRouter.post('/updatePassword', handleUpdatePassword)

// 更换邮箱
userRouter.post('/updateEmail', handleUpdateEmail)

// 注销账号
userRouter.post('/cancelAccount', handleCancelAccount)

// 更换头像
userRouter.post('/updateAvatar', handleUpdateAvatar)

// 更换背景图
userRouter.post('/updateBackImage', handleUpdateBackImage)

// 更换用户名
userRouter.post('/updateUsername', handleUpdateUsername)

// 更换简介
userRouter.post('/updateIntroduction', handleUpdateIntroduction)

// 修改性别
userRouter.post('/updateGender', handleUpdateGender)

// 修改地区
userRouter.post('/updateAddress', handleUpdateAddress)

// 修改生日
userRouter.post('/updateBirthday', handleUpdateBirthday)

// 获取用户信息
userRouter.get('/getInfo', handleGetInfo)

export default userRouter
