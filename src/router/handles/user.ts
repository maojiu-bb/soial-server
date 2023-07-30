import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {
  registerModel,
  loginUserModel,
  loginEmailModel
} from '../../controllers/user'
import { setToken } from '../../config/jwt'

// 注册
export const handleRegister = async (req: Request, res: Response) => {
  const { userid, username, password, email } = req.body
  if (!userid || !username || !password || !email) {
    return res.status(201).send({
      code: 201,
      msg: '请填写完整的参数',
      data: null
    })
  } else {
    const bcryptPassword = await bcrypt.hash(password, 10)
    const result = await registerModel({
      userid,
      username,
      password: bcryptPassword,
      email
    })
    if (result) {
      res.status(200).send({
        code: 200,
        msg: '注册成功！',
        data: null
      })
    } else {
      res.status(201).send({
        code: 201,
        msg: '注册失败！',
        data: null
      })
    }
  }
}

// 用户名登录
export const handleLoginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(201).send({
      code: 201,
      msg: '请填写完整的参数',
      data: null
    })
  } else {
    const result = await loginUserModel({ username, password })
    if (result) {
      res.status(200).send({
        code: 200,
        msg: '登录成功！',
        data: null,
        token: 'Bearer ' + setToken({ username, password })
      })
    } else {
      res.status(201).send({
        code: 201,
        msg: '登录失败！',
        data: null
      })
    }
  }
}

// 邮箱登录
export const handleLoginEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(201).send({
      code: 201,
      msg: '请填写完整的参数',
      data: null
    })
  } else {
    const result = await loginEmailModel({ email, password })
    if (result) {
      res.status(200).send({
        code: 200,
        msg: '登录成功！',
        data: null,
        token: 'Bearer ' + setToken({ email, password })
      })
    } else {
      res.status(201).send({
        code: 201,
        msg: '登录失败！',
        data: null
      })
    }
  }
}
