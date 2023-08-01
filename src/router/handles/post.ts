import { Request, Response } from 'express'
import {
  failRequest,
  parameterRequest,
  successRequest
} from '../../middleware/sendInfo'
import {
  addPostModel,
  deletePostModel,
  editPostModel,
  detailModel,
  getHotModel,
  getListModel,
  getSearchModel,
  getTotalModel,
  hideModel,
  updateLikeModel,
  updateStarModel,
  updateViewModel,
  reportModel,
  reportListModel,
  ownListModel,
  likeListModel,
  starListModel,
  cancelLikeModel,
  cancelStarModel
} from '../../controllers/post'

// 发布帖子
export const handleAdd = async (req: Request, res: Response) => {
  const { userid, username, date, avatar, content, images } = req.body
  if (!userid || !username || !avatar || (!content && !images)) {
    parameterRequest(res)
  } else {
    const result = await addPostModel({
      userid,
      username,
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

// 获取帖子分页列表
export const handleList = async (req: Request, res: Response) => {
  const { page, userid } = req.query
  if (!page || !userid) {
    parameterRequest(res)
  } else {
    const result = await getListModel({
      page: String(page),
      userid: String(userid)
    })
    if (result) {
      successRequest(res, '获取数据', { list: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 获取帖子总数
export const handleAll = async (req: Request, res: Response) => {
  const result = await getTotalModel()
  if (result) {
    successRequest(res, '获取数据', { total: result })
  } else {
    failRequest(res, '获取数据')
  }
}

// 获取热门搜索列表
export const handleHot = async (req: Request, res: Response) => {
  const result = await getHotModel()
  if (result) {
    successRequest(res, '获取数据', { hot: result })
  } else {
    failRequest(res, '获取数据')
  }
}

// 获取搜索列表
export const handleSearch = async (req: Request, res: Response) => {
  const { keyword } = req.query
  if (!keyword) {
    parameterRequest(res)
  } else {
    const result = await getSearchModel(keyword as string)
    if (result) {
      successRequest(res, '获取数据', { searchList: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 增加浏览
export const handleUpdateView = async (req: Request, res: Response) => {
  const { postid } = req.body
  if (!postid) {
    parameterRequest(res)
  } else {
    const result = await updateViewModel(postid)
    if (result) {
      successRequest(res, '增加浏览')
    } else {
      failRequest(res, '增加浏览')
    }
  }
}

// 喜欢
export const handleUpdateLike = async (req: Request, res: Response) => {
  const { postid, userid } = req.body
  if (!postid || !userid) {
    parameterRequest(res)
  } else {
    const result = await updateLikeModel({ postid, userid })
    if (result) {
      successRequest(res, '增加喜欢')
    } else {
      successRequest(res, '增加喜欢')
    }
  }
}

// 收藏
export const handleUpdateStar = async (req: Request, res: Response) => {
  const { postid, userid } = req.body
  if (!postid || !userid) {
    parameterRequest(res)
  } else {
    const result = await updateStarModel({ postid, userid })
    if (result) {
      successRequest(res, '增加收藏')
    } else {
      successRequest(res, '增加收藏')
    }
  }
}

// 隐藏
export const handleHide = async (req: Request, res: Response) => {
  const { postid, userid } = req.body
  if (!postid || !userid) {
    parameterRequest(res)
  } else {
    const result = await hideModel({ postid, userid })
    if (result) {
      successRequest(res, '隐藏')
    } else {
      failRequest(res, '隐藏')
    }
  }
}

// 举报
export const handleReport = async (req: Request, res: Response) => {
  const { postid } = req.body
  if (!postid) {
    parameterRequest(res)
  } else {
    const result = await reportModel(postid)
    if (result) {
      successRequest(res, '举报')
    } else {
      failRequest(res, '举报')
    }
  }
}

// 获取举报列表
export const handleReportList = async (req: Request, res: Response) => {
  const result = await reportListModel()
  if (result) {
    successRequest(res, '获取数据', { reportList: result })
  } else {
    failRequest(res, '获取数据')
  }
}

// 获取帖子详情
export const handleDetail = async (req: Request, res: Response) => {
  const { postid } = req.query
  if (!postid) {
    parameterRequest(res)
  } else {
    const result = await detailModel(postid as string)
    if (result) {
      successRequest(res, '获取数据', { detail: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 获取我的帖子列表
export const handleOwn = async (req: Request, res: Response) => {
  const { userid } = req.query
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await ownListModel(userid as string)
    if (result) {
      successRequest(res, '获取数据', { ownList: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 获取喜欢帖子列表
export const handleLike = async (req: Request, res: Response) => {
  const { userid } = req.query
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await likeListModel(userid as string)
    if (result) {
      successRequest(res, '获取数据', { likeList: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 获取收藏帖子列表
export const handleStar = async (req: Request, res: Response) => {
  const { userid } = req.query
  if (!userid) {
    parameterRequest(res)
  } else {
    const result = await starListModel(userid as string)
    if (result) {
      successRequest(res, '获取数据', { starList: result })
    } else {
      failRequest(res, '获取数据')
    }
  }
}

// 取消喜欢
export const handleCancelLike = async (req: Request, res: Response) => {
  const { userid, postid } = req.body
  if (!userid || !postid) {
    parameterRequest(res)
  } else {
    const result = await cancelLikeModel({ userid, postid })
    if (result) {
      successRequest(res, '取消喜欢')
    } else {
      failRequest(res, '取消喜欢')
    }
  }
}

// 取消收藏
export const handleCancelStar = async (req: Request, res: Response) => {
  const { userid, postid } = req.body
  if (!userid || !postid) {
    parameterRequest(res)
  } else {
    const result = await cancelStarModel({ userid, postid })
    if (result) {
      successRequest(res, '取消收藏')
    } else {
      failRequest(res, '取消收藏')
    }
  }
}
