import request from './request.js'

export const skillAPI = {
  list(params) { return request.get('/skills', { params }) },
  getById(id) { return request.get(`/skills/${id}`) },
  create(data) { return request.post('/skills', data) },
  update(id, data) { return request.put(`/skills/${id}`, data) },
  remove(id) { return request.delete(`/skills/${id}`) }
}
