import { Request, Response } from 'express'
import {
  failRequest,
  parameterRequest,
  successRequest
} from '../../middleware/sendInfo'
import {
  allHistoryModel,
  createModel,
  deleteAllModel,
  deleteOneModel
} from '../../controllers/history'

// 创建搜索历史
export const handleCreate = async (req: Request, res: Response) => {
  const { userid, keyword } = req.body
  if (!userid || !keyword) {
    parameterRequest(res)
  } else {
    const result = await createModel({ userid, keyword })
    if (result) {
      successRequest(res, '创建搜索历史')
    } else {
      failRequest(res, '创建搜索历史')
    }
  }
}

// 获取搜索历史
export const handleAllHistory = async (req: Request, res: Response) => {
  const { userid } = req.query
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await allHistoryModel(userid as string)
    if (result) {
      successRequest(res, '获取数据', { histories: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 删除一条搜索历史
export const handleDeleteOne = async (req: Request, res: Response) => {
  const { userid, historyid } = req.query
  if (!userid || !historyid) {
    parameterRequest(res)
  } else {
    const result = await deleteOneModel({
      userid: String(userid),
      historyid: String(historyid)
    })
    if (result) {
      successRequest(res, '删除搜索历史')
    } else {
      failRequest(res, '删除搜索历史')
    }
  }
}

// 清空搜索历史
export const handleDeleteAll = async (req: Request, res: Response) => {
  const { userid } = req.query
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await deleteAllModel(userid as string)
    if (result) {
      successRequest(res, '清空搜索历史')
    } else {
      failRequest(res, '清空搜索历史')
    }
  }
}
