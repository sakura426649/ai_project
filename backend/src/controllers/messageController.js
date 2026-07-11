import { messageService } from '../services/messageService.js'
import { success, paginated } from '../utils/response.js'

export const messageController = {
  create(req, res, next) {
    try {
      const msg = messageService.create(req.body)
      res.status(201).json(success(msg, '消息发送成功'))
    } catch (err) { next(err) }
  },

  listByConversation(req, res, next) {
    try {
      const { page = 1, pageSize = 50 } = req.query
      const { rows, total } = messageService.findByConversation(+req.params.conversationId, { page: +page, pageSize: +pageSize })
      res.json(paginated(rows, total, +page, +pageSize))
    } catch (err) { next(err) }
  },

  recordUsage(req, res, next) {
    try {
      const record = messageService.recordUsage({ ...req.body, userId: req.user.id })
      res.status(201).json(success(record, '用量记录成功'))
    } catch (err) { next(err) }
  },

  getUsageStats(req, res, next) {
    try {
      const stats = messageService.getUsageStats()
      res.json(success(stats))
    } catch (err) { next(err) }
  },

  getUserUsage(req, res, next) {
    try {
      const { page = 1, pageSize = 20 } = req.query
      const { rows, total } = messageService.getUserUsage(req.user.id, { page: +page, pageSize: +pageSize })
      res.json(paginated(rows, total, +page, +pageSize))
    } catch (err) { next(err) }
  }
}
