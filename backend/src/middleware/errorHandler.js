import { error } from '../utils/response.js'

export function errorHandler(err, req, res, next) {
  console.error('[Error]', err.message || err)
  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? '服务器内部错误' : err.message
  res.status(statusCode).json(error(message))
}
