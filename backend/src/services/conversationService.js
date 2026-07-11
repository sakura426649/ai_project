import { Conversation } from '../models/Conversation.js'

export const conversationService = {
  create({ userId, title, conversationType, groupId, agentId }) {
    return Conversation.create({ userId, title, conversationType, groupId, agentId })
  },

  findById(id) {
    const conv = Conversation.findById(id)
    if (!conv) { const err = new Error('会话不存在'); err.statusCode = 404; throw err }
    return conv
  },

  listByUser(userId, { page = 1, pageSize = 20 } = {}) {
    return Conversation.findByUser(userId, { page, pageSize })
  },

  listByType(userId, conversationType) {
    return Conversation.findByType(userId, conversationType)
  },

  update(id, fields) {
    const conv = Conversation.findById(id)
    if (!conv) { const err = new Error('会话不存在'); err.statusCode = 404; throw err }
    const allowed = {}
    if (fields.title !== undefined) allowed.title = fields.title
    if (fields.pinned !== undefined) allowed.pinned = fields.pinned
    return Conversation.update(id, allowed)
  },

  delete(id) {
    const conv = Conversation.findById(id)
    if (!conv) { const err = new Error('会话不存在'); err.statusCode = 404; throw err }
    Conversation.delete(id)
  }
}
