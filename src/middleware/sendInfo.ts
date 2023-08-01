import { Response } from 'express'

export const parameterRequest = (res: Response) => {
  return res.status(404).send({
    code: 404,
    msg: '请填写完整的参数',
    data: null
  })
}

export const successRequest = (res: Response, msg: string, data = {}) => {
  return res.status(200).send({
    code: 200,
    msg: `${msg}成功！`,
    data
  })
}

export const failRequest = (res: Response, msg: string, data = null) => {
  return res.status(500).send({
    code: 500,
    msg: `${msg}失败！`,
    data: data
  })
}
