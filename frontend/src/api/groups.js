import request from './request.js'

export const groupAPI = {
  list() { return request.get('/groups') },
  listMine() { return request.get('/groups/mine') },
  getById(id) { return request.get(`/groups/${id}`) },
  create(data) { return request.post('/groups', data) },
  update(id, data) { return request.put(`/groups/${id}`, data) },
  remove(id) { return request.delete(`/groups/${id}`) },
  getMembers(id) { return request.get(`/groups/${id}/members`) },
  addMember(id, data) { return request.post(`/groups/${id}/members`, data) },
  removeMember(id, userId) { return request.delete(`/groups/${id}/members/${userId}`) },
  getAgents(id) { return request.get(`/groups/${id}/agents`) },
  addAgent(id, data) { return request.post(`/groups/${id}/agents`, data) },
  removeAgent(id, agentId) { return request.delete(`/groups/${id}/agents/${agentId}`) }
}
