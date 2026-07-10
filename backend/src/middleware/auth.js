import { verifyAccessToken } from '../utils/jwt.js'
import { error } from '../utils/response.js'

export function authRequired(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json(error('未登录或Token已过期'))
  }
  try {
    const payload = verifyAccessToken(header.slice(7))
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json(error('Token无效或已过期'))
  }
}

export function adminRequired(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json(error('需要管理员权限'))
  }
  next()
}
