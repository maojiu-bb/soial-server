import { NextFunction, Request, Response } from 'express'

// 错误处理中间件
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message)

  // 进行相应的错误处理逻辑，返回适当的错误响应

  res.status(500).json({ error: err.message })
}

export default errorMiddleware
