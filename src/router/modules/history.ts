import express from 'express'
import {
  handleAllHistory,
  handleCreate,
  handleDeleteAll,
  handleDeleteOne
} from '../handles/history'

const historyRouter = express.Router()

// 创建搜索历史
historyRouter.post('/create', handleCreate)

// 获取搜索历史
historyRouter.get('/allHistory', handleAllHistory)

// 删除一条搜索历史
historyRouter.delete('/deleteOne', handleDeleteOne)

// 清空搜索历史
historyRouter.delete('/deleteAll', handleDeleteAll)

export default historyRouter
