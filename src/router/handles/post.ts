import { Request, Response } from 'express'
import {
  failRequest,
  parameterRequest,
  successRequest
} from '../../middleware/sendInfo'
import {
  addPostModel,
  deletePostModel,
  editPostModel
} from '../../controllers/post'

// 发布帖子
export const handleAdd = async (req: Request, res: Response) => {
  const { postid, userid, username, date, avatar, content, images } = req.body
  if (
    !postid ||
    !userid ||
    !username ||
    !date ||
    !avatar ||
    !content ||
    !images
  ) {
    parameterRequest(res)
  } else {
    const result = await addPostModel({
      postid,
      userid,
      username,
      date,
      avatar,
      content,
      images
    })
    if (result) {
      successRequest(res, '发布')
    } else {
      failRequest(res, '发布')
    }
  }
}

// 修改帖子
export const handleEdit = async (req: Request, res: Response) => {
  const { postid, content, images } = req.body
  if (!postid || !content || !images) {
    parameterRequest(res)
  } else {
    const result = await editPostModel({
      postid,
      content,
      images
    })
    if (result) {
      successRequest(res, '修改')
    } else {
      failRequest(res, '修改')
    }
  }
}

// 删除帖子
export const handleDelete = async (req: Request, res: Response) => {
  const { postid } = req.query
  if (!postid) {
    parameterRequest(res)
  } else {
    const result = await deletePostModel(postid as string)
    if (result) {
      successRequest(res, '删除')
    } else {
      failRequest(res, '删除')
    }
  }
}
