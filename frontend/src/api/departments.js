import request from './request.js'

export const departmentAPI = {
  list() { return request.get('/departments') },
  tree() { return request.get('/departments/tree') },
  getById(id) { return request.get(`/departments/${id}`) },
  create(data) { return request.post('/departments', data) },
  update(id, data) { return request.put(`/departments/${id}`, data) },
  remove(id) { return request.delete(`/departments/${id}`) }
}
