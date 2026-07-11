import { Message } from '../models/Message.js'
import { UsageRecord } from '../models/UsageRecord.js'

export const messageService = {
  create({ conversationId, role, content, senderName, senderAvatar }) {
    if (!conversationId || !role || !content) {
      const err = new Error('会话ID、角色、内容为必填'); err.statusCode = 400; throw err
    }
    return Message.create({ conversationId, role, content, senderName, senderAvatar })
  },

  findByConversation(conversationId, { page = 1, pageSize = 50 } = {}) {
    return Message.findByConversation(conversationId, { page, pageSize })
  },

  recordUsage({ userId, model, promptTokens = 0, completionTokens = 0 }) {
    return UsageRecord.create({ userId, model, promptTokens, completionTokens })
  },

  getUsageStats() {
    return UsageRecord.getStats()
  },

  getUserUsage(userId, { page = 1, pageSize = 20 } = {}) {
    return UsageRecord.findByUser(userId, { page, pageSize })
  }
}
