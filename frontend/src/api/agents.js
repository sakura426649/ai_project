import request from './request.js'

export const agentAPI = {
  list() { return request.get('/agents') },
  listMine() { return request.get('/agents/mine') },
  getById(id) { return request.get(`/agents/${id}`) },
  create(data) { return request.post('/agents', data) },
  update(id, data) { return request.put(`/agents/${id}`, data) },
  remove(id) { return request.delete(`/agents/${id}`) },
  getSkills(id) { return request.get(`/agents/${id}/skills`) },
  bindSkill(id, skillId) { return request.post(`/agents/${id}/skills`, { skillId }) },
  unbindSkill(id, skillId) { return request.delete(`/agents/${id}/skills/${skillId}`) }
}
