import request from './request.js'

export const messageAPI = {
  create(data) { return request.post('/messages', data) },
  listByConversation(conversationId, params) { return request.get(`/messages/conversation/${conversationId}`, { params }) },
  recordUsage(data) { return request.post('/messages/usage', data) },
  getUsageStats() { return request.get('/messages/usage/stats') },
  getUserUsage(params) { return request.get('/messages/usage/mine', { params }) }
}
