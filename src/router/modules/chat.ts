import express from 'express'
import { handleCreateMessage } from '../handles/chat'

const chatRouter = express.Router()

// 新消息
chatRouter.post('/message', handleCreateMessage)

export default chatRouter
