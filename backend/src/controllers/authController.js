import { authService } from '../services/authService.js'
import { success } from '../utils/response.js'
import { validationResult } from 'express-validator'

export const authController = {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(422).json({ success: false, message: errors.array()[0].msg })
      const result = await authService.register(req.body)
      res.status(201).json(success(result, '注册成功'))
    } catch (err) { next(err) }
  },
  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(422).json({ success: false, message: errors.array()[0].msg })
      const result = await authService.login(req.body)
      res.json(success(result, '登录成功'))
    } catch (err) { next(err) }
  },
  async me(req, res, next) {
    try {
      const user = await authService.getMe(req.user.id)
      res.json(success(user))
    } catch (err) { next(err) }
  }
}
