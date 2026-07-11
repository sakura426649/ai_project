import { conversationService } from '../services/conversationService.js'
import { success, paginated } from '../utils/response.js'

export const conversationController = {
  create(req, res, next) {
    try {
      const conv = conversationService.create({ ...req.body, userId: req.user.id })
      res.status(201).json(success(conv, '会话创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const conv = conversationService.findById(+req.params.id)
      res.json(success(conv))
    } catch (err) { next(err) }
  },

  listMine(req, res, next) {
    try {
      const { page = 1, pageSize = 20, type } = req.query
      let result
      if (type) {
        const rows = conversationService.listByType(req.user.id, type)
        result = { rows, total: rows.length }
      } else {
        result = conversationService.listByUser(req.user.id, { page: +page, pageSize: +pageSize })
      }
      res.json(paginated(result.rows, result.total, +page, +pageSize))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const conv = conversationService.update(+req.params.id, req.body)
      res.json(success(conv, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      conversationService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  }
}
