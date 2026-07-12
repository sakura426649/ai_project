import request from './request.js'

export const apiconfigAPI = {
  list() { return request.get('/apiconfigs') },
  getById(id) { return request.get(`/apiconfigs/${id}`) },
  create(data) { return request.post('/apiconfigs', data) },
  update(id, data) { return request.put(`/apiconfigs/${id}`, data) },
  remove(id) { return request.delete(`/apiconfigs/${id}`) }
}
