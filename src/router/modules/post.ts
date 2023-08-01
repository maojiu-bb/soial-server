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
  handleReportList,
  handleOwn,
  handleLike,
  handleStar,
  handleCancelLike,
  handleCancelStar
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

// 获取我的帖子列表
postRouter.get('/own', handleOwn)

// 获取喜欢帖子列表
postRouter.get('/like', handleLike)

// 获取收藏的帖子列表
postRouter.get('/star', handleStar)

// 取消喜欢
postRouter.put('/cancelLike', handleCancelLike)

// 取消收藏
postRouter.put('/cancelStar', handleCancelStar)

export default postRouter
