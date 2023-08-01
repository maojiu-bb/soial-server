import express from 'express'
import {
  handleAdd,
  handleUpdateView,
  handleAll,
  handleDelete,
  handleEdit,
  handleHot,
  handleList,
  handleSearch,
  handleUpdateLike,
  handleUpdateStar,
  handleHide,
  handleDetail,
  handleReport,
  handleReportList
} from '../handles/post'

const postRouter = express.Router()

// 发布帖子
postRouter.post('/add', handleAdd)

// 修改帖子
postRouter.put('/edit', handleEdit)

// 删除帖子
postRouter.delete('/delete', handleDelete)

// 获取帖子分页列表
postRouter.get('/list', handleList)

// 获取帖子总数
postRouter.get('/all', handleAll)

// 获取热门搜索列表
postRouter.get('/hot', handleHot)

// 获取搜索列表
postRouter.get('/search', handleSearch)

// 增加浏览
postRouter.put('/updateView', handleUpdateView)

// 喜欢
postRouter.put('/updateLike', handleUpdateLike)

// 收藏
postRouter.put('/updateStar', handleUpdateStar)

// 隐藏
postRouter.put('/hide', handleHide)

// 举报
postRouter.put('/report', handleReport)

// 获取举报列表
postRouter.get('/reportList', handleReportList)

// 获取帖子详情
postRouter.get('/detail', handleDetail)

export default postRouter
