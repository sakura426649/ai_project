import request from './request.js'

export const conversationAPI = {
  list(params) { return request.get('/conversations', { params }) },
  getById(id) { return request.get(`/conversations/${id}`) },
  create(data) { return request.post('/conversations', data) },
  update(id, data) { return request.put(`/conversations/${id}`, data) },
  remove(id) { return request.delete(`/conversations/${id}`) }
}
