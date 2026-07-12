import request from './request.js'

export const authAPI = {
  login(data) { return request.post('/auth/login', data) },
  register(data) { return request.post('/auth/register', data) },
  me() { return request.get('/auth/me') }
}
