import { body } from 'express-validator'
export const registerRules = [
  body('username').trim().isLength({ min: 3, max: 20 }).withMessage('用户名需要3-20个字符'),
  body('password').isLength({ min: 6, max: 30 }).withMessage('密码需要6-30个字符'),
  body('email').optional().isEmail().withMessage('邮箱格式不正确')
]
export const loginRules = [
  body('username').trim().notEmpty().withMessage('请输入用户名'),
  body('password').notEmpty().withMessage('请输入密码')
]
