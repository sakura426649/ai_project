import request from './request.js'

export const userAPI = {
  list(params) { return request.get('/users', { params }) },
  getById(id) { return request.get(`/users/${id}`) },
  update(id, data) { return request.put(`/users/${id}`, data) }
}
