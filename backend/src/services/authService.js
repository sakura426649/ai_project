import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { signAccessToken } from '../utils/jwt.js'

const SALT_ROUNDS = 10

export const authService = {
  async register({ username, password, email }) {
    const existing = User.findByUsername(username)
    if (existing) { const err = new Error('用户名已存在'); err.statusCode = 400; throw err }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = User.create({ username, passwordHash, email })
    return { id: user.id, username: user.username, email: user.email, role: user.role }
  },
  async login({ username, password }) {
    const user = User.findByUsername(username)
    if (!user) { const err = new Error('用户名或密码错误'); err.statusCode = 401; throw err }
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) { const err = new Error('用户名或密码错误'); err.statusCode = 401; throw err }
    if (user.is_disabled) { const err = new Error('账户已被禁用'); err.statusCode = 403; throw err }
    const payload = { id: user.id, username: user.username, role: user.role }
    const accessToken = signAccessToken(payload)
    return { accessToken, user: { id: user.id, username: user.username, email: user.email, role: user.role } }
  },
  async getMe(userId) {
    const user = User.findById(userId)
    if (!user) { const err = new Error('用户不存在'); err.statusCode = 404; throw err }
    return user
  }
}
