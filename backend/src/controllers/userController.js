import { userService } from '../services/userService.js'
import { success, paginated } from '../utils/response.js'

export const userController = {
  list(req, res, next) {
    try {
      const { page = 1, pageSize = 20 } = req.query
      const { rows, total } = userService.list({ page: +page, pageSize: +pageSize })
      res.json(paginated(rows, total, +page, +pageSize))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const user = userService.findById(+req.params.id)
      res.json(success(user))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const user = userService.update(+req.params.id, req.body)
      res.json(success(user, '更新成功'))
    } catch (err) { next(err) }
  }
}
