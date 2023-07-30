import User from '../models/user'
import bcrypt from 'bcrypt'

interface RegisterUserInfo {
  userid: number | string
  username: string
  password: string
  email: string
}

interface LoginUserInfo {
  username: string
  password: string
}

interface LoginEmailInfo {
  email: string
  password: string
}

// 注册
export const registerModel = async (userInfo: RegisterUserInfo) => {
  const insertUserInfo = {
    userid: userInfo.userid,
    username: userInfo.username,
    password: userInfo.password,
    email: userInfo.email,
    avatar:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.Ra7bwXMtharOQv3Z14eI-QAAAA?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    sex: '',
    introduction: '',
    address: '',
    birthday: '',
    backgroundImage:
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.Q_Eb78_1wf…kiRSAHaE7?w=240&h=190&c=7&r=0&o=5&dpr=1.1&pid=1.7'
  }

  try {
    const existingUser = await User.findOne({
      username: userInfo.username,
      email: userInfo.email
    })
    if (existingUser) {
      throw new Error('User already exists')
    }

    const res = new User(insertUserInfo).save()
    return res
  } catch (error) {
    return false
  }
}

// 用户名密码登录
export const loginUserModel = async ({ username, password }: LoginUserInfo) => {
  try {
    const user = await User.findOne({ username }).exec()
    if (!user) {
      throw new Error('User does not exist')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
      return user
    } else {
      throw new Error('Incorrect password')
    }
  } catch (error) {
    return false
  }
}

// 邮箱密码登录
export const loginEmailModel = async ({ email, password }: LoginEmailInfo) => {
  try {
    const user = await User.findOne({ email }).exec()
    if (!user) {
      throw new Error('User does not exist')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
      return user
    } else {
      throw new Error('Incorrect password')
    }
  } catch (error) {
    return false
  }
}
