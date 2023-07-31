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

interface UpdatePasswordInfo {
  userid: number | string
  oldPassword: string
  newPassword: string
}

type LogoutInfo = string | number

interface ForgetPasswordInfo {
  email: string
  newPassword: string
}

interface UpdateEmailInfo {
  userid: number | string
  oldEmail: string
  newEmail: string
}

type CancelAccountInfo = number | string

interface UpdateAvatarInfo {
  userid: number | string
  avatar: string
}

interface UpdateBackImageInfo {
  userid: number | string
  backgroundImage: string
}

interface UpdateUsernameInfo {
  userid: number | string
  newUsername: string
}

interface UpdateIntroductionInfo {
  userid: number | string
  introduction: string
}

interface UpdateGenderInfo {
  userid: number | string
  sex: string
}

interface UpdateAddressInfo {
  userid: number | string
  address: string
}

interface UpdateBirthdayInfo {
  userid: number | string
  birthday: string
}

type GetUserInfo = number | string

// 注册
export const registerModel = async (userInfo: RegisterUserInfo) => {
  const bcryptPassword = await bcrypt.hash(userInfo.password, 10)
  const insertUserInfo = {
    userid: userInfo.userid,
    username: userInfo.username,
    password: bcryptPassword,
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
      $or: [{ username: userInfo.username }, { email: userInfo.email }]
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

// 退出登录
export const logoutModel = async (userid: LogoutInfo) => {
  try {
    const res = await User.findOne({ userid: userid }).exec()
    if (!res) {
      throw new Error('User does not exist')
    }
    return res
  } catch (error) {
    return false
  }
}

// 忘记密码
export const forgetPasswordModel = async ({
  email,
  newPassword
}: ForgetPasswordInfo) => {
  try {
    const user = await User.findOne({ email: email }).exec()
    if (!user) {
      throw new Error('User does not exist')
    }
    const bcryptPassword = await bcrypt.hash(newPassword, 10)
    const res = await User.updateOne(
      { email: email },
      { $set: { password: bcryptPassword } }
    )
    if (res) {
      return res
    } else {
      throw new Error('failed to update password')
    }
  } catch (error) {
    return false
  }
}

// 更换密码
export const updatePasswordModel = async ({
  userid,
  oldPassword,
  newPassword
}: UpdatePasswordInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User does not exist')
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password)
    const bcryptPassword = await bcrypt.hash(newPassword, 10)
    if (passwordMatch) {
      const res = await User.updateOne(
        { userid: userid },
        { $set: { password: bcryptPassword } }
      )
      return res
    } else {
      throw new Error('Incorrect password')
    }
  } catch (error) {
    return false
  }
}

// 更换邮箱
export const updateEmailModel = async ({
  userid,
  oldEmail,
  newEmail
}: UpdateEmailInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User does not exist')
    }
    if (user.email !== oldEmail) {
      throw new Error('Old email does not match')
    }
    const existEmail = await User.findOne({ email: newEmail }).exec()
    if (existEmail) {
      throw new Error('Email already exists')
    }
    const res = await User.updateOne(
      { userid: userid },
      { $set: { email: newEmail } }
    )
    return res
  } catch (error) {
    return false
  }
}

// 注销账号
export const cancelAccountModel = async (userid: CancelAccountInfo) => {
  try {
    const res = await User.findOneAndRemove({ userid: userid }).exec()
    if (!res) {
      throw new Error('Cannot find user')
    }
    return res
  } catch (error) {
    return false
  }
}

// 更换头像
export const updateAvatarModel = async ({
  userid,
  avatar
}: UpdateAvatarInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = User.updateOne({ userid: userid }, { $set: { avatar: avatar } })
    if (!res) {
      throw new Error('Cannot update avatar')
    }
    return res
  } catch (error) {
    return false
  }
}

// 更换背景图
export const updateBackImageModel = async ({
  userid,
  backgroundImage
}: UpdateBackImageInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = User.updateOne(
      { userid: userid },
      { $set: { backgroundImage: backgroundImage } }
    )
    if (!res) {
      throw new Error('Cannot update backgroundImage')
    }
    return res
  } catch (error) {
    return false
  }
}

// 更换用户名
export const updateUsernameModel = async ({
  userid,
  newUsername
}: UpdateUsernameInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const existUsername = await User.findOne({ username: newUsername }).exec()
    if (existUsername) {
      throw new Error('Username already exists')
    }
    const res = User.updateOne(
      { userid: userid },
      { $set: { username: newUsername } }
    )
    if (!res) {
      throw new Error('Cannot update username')
    }
    return res
  } catch (error) {
    return false
  }
}

// 更换简介
export const updateIntroductionModel = async ({
  userid,
  introduction
}: UpdateIntroductionInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = User.updateOne(
      { userid: userid },
      { $set: { introduction: introduction } }
    )
    if (!res) {
      throw new Error('Cannot update introduction')
    }
    return res
  } catch (error) {
    return false
  }
}

// 修改性别
export const updateGenderModel = async ({ userid, sex }: UpdateGenderInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = User.updateOne({ userid: userid }, { $set: { sex: sex } })
    if (!res) {
      throw new Error('Cannot update sex')
    }
    return res
  } catch (error) {
    return false
  }
}

// 修改地区
export const updateAddressModel = async ({
  userid,
  address
}: UpdateAddressInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = User.updateOne(
      { userid: userid },
      { $set: { address: address } }
    )
    if (!res) {
      throw new Error('Cannot update address')
    }
    return res
  } catch (error) {
    return false
  }
}

// 修改生日
export const updateBirthdayModel = async ({
  userid,
  birthday
}: UpdateBirthdayInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = User.updateOne(
      { userid: userid },
      { $set: { birthday: birthday } }
    )
    if (!res) {
      throw new Error('Cannot update birthday')
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取用户信息
export const getUserInfoModel = async (userid: GetUserInfo) => {
  try {
    const res = User.findOne({ userid: userid }).exec()
    if (!res) {
      throw new Error('User not found')
    }
    return res
  } catch (error) {
    return false
  }
}
