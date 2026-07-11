import { Group } from '../models/Group.js'

export const groupService = {
  create({ name, description, avatar, announcement, createdBy }) {
    if (!name) { const err = new Error('群组名称不能为空'); err.statusCode = 400; throw err }
    return Group.create({ name, description, avatar, announcement, createdBy })
  },

  findById(id) {
    const group = Group.findById(id)
    if (!group) { const err = new Error('群组不存在'); err.statusCode = 404; throw err }
    return group
  },

  listAll() {
    return Group.findAll()
  },

  listByUser(userId) {
    return Group.findByUser(userId)
  },

  update(id, fields) {
    const group = Group.findById(id)
    if (!group) { const err = new Error('群组不存在'); err.statusCode = 404; throw err }
    const allowed = {}
    if (fields.name !== undefined) allowed.name = fields.name
    if (fields.description !== undefined) allowed.description = fields.description
    if (fields.avatar !== undefined) allowed.avatar = fields.avatar
    if (fields.announcement !== undefined) allowed.announcement = fields.announcement
    return Group.update(id, allowed)
  },

  delete(id) {
    const group = Group.findById(id)
    if (!group) { const err = new Error('群组不存在'); err.statusCode = 404; throw err }
    Group.delete(id)
  },

  addMember(groupId, userId, role) {
    Group.addMember(groupId, userId, role || 'member')
  },

  removeMember(groupId, userId) {
    Group.removeMember(groupId, userId)
  },

  getMembers(groupId) {
    return Group.getMembers(groupId)
  },

  addAgent(groupId, agentId) {
    Group.addAgent(groupId, agentId)
  },

  removeAgent(groupId, agentId) {
    Group.removeAgent(groupId, agentId)
  },

  getAgents(groupId) {
    return Group.getAgents(groupId)
  }
}
