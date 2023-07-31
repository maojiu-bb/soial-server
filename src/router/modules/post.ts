import express from 'express'
import { handleAdd, handleDelete, handleEdit } from '../handles/post'

const postRouter = express.Router()

// 发布帖子
postRouter.post('/add', handleAdd)

// 修改帖子
postRouter.put('/edit', handleEdit)

// 删除帖子
postRouter.delete('/delete', handleDelete)

export default postRouter
