import { User } from '../models/User.js'

export const userService = {
  list({ page = 1, pageSize = 20 } = {}) {
    return User.findAll({ page, pageSize })
  },

  findById(id) {
    const user = User.findById(id)
    if (!user) { const err = new Error('用户不存在'); err.statusCode = 404; throw err }
    return user
  },

  update(id, fields) {
    const allowed = {}
    if (fields.email !== undefined) allowed.email = fields.email
    if (fields.role !== undefined) allowed.role = fields.role
    if (fields.is_disabled !== undefined) allowed.is_disabled = fields.is_disabled
    if (!Object.keys(allowed).length) {
      const err = new Error('无可更新字段'); err.statusCode = 400; throw err
    }
    return User.update(id, allowed)
  }
}
