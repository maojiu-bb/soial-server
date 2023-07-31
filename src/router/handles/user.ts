import { Request, Response } from 'express'
import {
  registerModel,
  loginUserModel,
  loginEmailModel,
  updatePasswordModel,
  logoutModel,
  forgetPasswordModel,
  updateEmailModel,
  cancelAccountModel,
  updateAvatarModel,
  updateBackImageModel,
  updateUsernameModel,
  updateIntroductionModel,
  updateGenderModel,
  updateAddressModel,
  updateBirthdayModel,
  getUserInfoModel
} from '../../controllers/user'
import { setToken } from '../../config/jwt'
import {
  parameterRequest,
  successRequest,
  failRequest
} from '../../middleware/sendInfo'

// 注册
export const handleRegister = async (req: Request, res: Response) => {
  const { userid, username, password, email } = req.body
  if (!userid || !username || !password || !email) {
    return parameterRequest(res)
  } else {
    const result = await registerModel({
      userid,
      username,
      password,
      email
    })
    if (result) {
      successRequest(res, '注册')
    } else {
      failRequest(res, '注册')
    }
  }
}

// 用户名登录
export const handleLoginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    return parameterRequest(res)
  } else {
    const result = await loginUserModel({ username, password })
    if (result) {
      successRequest(res, '登录', {
        token: 'Bearer ' + setToken({ username, password })
      })
    } else {
      failRequest(res, '登录')
    }
  }
}

// 邮箱登录
export const handleLoginEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return parameterRequest(res)
  } else {
    const result = await loginEmailModel({ email, password })
    if (result) {
      successRequest(res, '登录', {
        token: 'Bearer ' + setToken({ email, password })
      })
    } else {
      failRequest(res, '登录')
    }
  }
}

// 退出登录
export const handleLogout = async (req: Request, res: Response) => {
  const { userid } = req.body
  if (!userid) {
    return parameterRequest(res)
  } else {
    const result = await logoutModel(userid)
    if (result) {
      successRequest(res, '退出登录')
    } else {
      failRequest(res, '退出登录')
    }
  }
}

// 忘记密码
export const handleForgetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body
  if (!email || !newPassword) {
    return parameterRequest(res)
  } else {
    const result = await forgetPasswordModel({ email, newPassword })
    if (result) {
      successRequest(res, '重置密码')
    } else {
      failRequest(res, '重置密码')
    }
  }
}

// 更换密码
export const handleUpdatePassword = async (req: Request, res: Response) => {
  const { userid, oldPassword, newPassword } = req.body
  if (!userid || !oldPassword || !newPassword) {
    return parameterRequest(res)
  } else {
    const result = await updatePasswordModel({
      userid,
      oldPassword,
      newPassword
    })
    if (result) {
      successRequest(res, '更换密码')
    } else {
      failRequest(res, '更换密码')
    }
  }
}

// 更换邮箱
export const handleUpdateEmail = async (req: Request, res: Response) => {
  const { userid, oldEmail, newEmail } = req.body
  if (!userid || !oldEmail || !newEmail) {
    parameterRequest(res)
  } else {
    const result = await updateEmailModel({ userid, oldEmail, newEmail })
    if (result) {
      successRequest(res, '更换邮箱')
    } else {
      failRequest(res, '更换邮箱')
    }
  }
}

// 注销账号
export const handleCancelAccount = async (req: Request, res: Response) => {
  const { userid } = req.body
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await cancelAccountModel(userid)
    if (result) {
      successRequest(res, '注销账号')
    } else {
      failRequest(res, '注销账号')
    }
  }
}

// 更换头像
export const handleUpdateAvatar = async (req: Request, res: Response) => {
  const { userid, avatar } = req.body
  if (!userid || !avatar) {
    parameterRequest(res)
  } else {
    const result = await updateAvatarModel({ userid, avatar })
    if (result) {
      successRequest(res, '更换头像')
    } else {
      failRequest(res, '更换头像')
    }
  }
}

// 更换背景图
export const handleUpdateBackImage = async (req: Request, res: Response) => {
  const { userid, backgroundImage } = req.body
  if (!userid || !backgroundImage) {
    parameterRequest(res)
  } else {
    const result = await updateBackImageModel({ userid, backgroundImage })
    if (result) {
      successRequest(res, '更换背景')
    } else {
      failRequest(res, '更换背景')
    }
  }
}

// 更换用户名
export const handleUpdateUsername = async (req: Request, res: Response) => {
  const { userid, newUsername } = req.body
  if (!userid || !newUsername) {
    parameterRequest(res)
  } else {
    const result = await updateUsernameModel({ userid, newUsername })
    if (result) {
      successRequest(res, '更换用户名')
    } else {
      failRequest(res, '更换用户名')
    }
  }
}

// 更换简介
export const handleUpdateIntroduction = async (req: Request, res: Response) => {
  const { userid, introduction } = req.body
  if (!userid || !introduction) {
    parameterRequest(res)
  } else {
    const result = await updateIntroductionModel({ userid, introduction })
    if (result) {
      successRequest(res, '更换简介')
    } else {
      failRequest(res, '更换简介')
    }
  }
}

// 修改性别
export const handleUpdateGender = async (req: Request, res: Response) => {
  const { userid, sex } = req.body
  if (!userid || !sex) {
    parameterRequest(res)
  } else {
    const result = await updateGenderModel({ userid, sex })
    if (result) {
      successRequest(res, '更换性别')
    } else {
      failRequest(res, '更换性别')
    }
  }
}

// 修改地区
export const handleUpdateAddress = async (req: Request, res: Response) => {
  const { userid, address } = req.body
  if (!userid || !address) {
    parameterRequest(res)
  } else {
    const result = await updateAddressModel({ userid, address })
    if (result) {
      successRequest(res, '更换地区')
    } else {
      failRequest(res, '更换地区')
    }
  }
}

// 修改生日
export const handleUpdateBirthday = async (req: Request, res: Response) => {
  const { userid, birthday } = req.body
  if (!userid || !birthday) {
    parameterRequest(res)
  } else {
    const result = await updateBirthdayModel({ userid, birthday })
    if (result) {
      successRequest(res, '更换生日')
    } else {
      failRequest(res, '更换生日')
    }
  }
}

// 获取用户信息
export const handleGetInfo = async (req: Request, res: Response) => {
  const { userid } = req.query
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await getUserInfoModel(userid as string)
    if (result) {
      successRequest(res, '获取数据', { user: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}
