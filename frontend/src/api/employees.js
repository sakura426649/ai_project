import request from './request.js'

export const employeeAPI = {
  list(params) { return request.get('/employees', { params }) },
  getById(id) { return request.get(`/employees/${id}`) },
  create(data) { return request.post('/employees', data) },
  update(id, data) { return request.put(`/employees/${id}`, data) },
  remove(id) { return request.delete(`/employees/${id}`) }
}
