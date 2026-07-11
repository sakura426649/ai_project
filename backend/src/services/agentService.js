import { Agent } from '../models/Agent.js'
import { Skill } from '../models/Skill.js'

export const agentService = {
  create({ userId, name, avatar, systemPrompt, welcomeMessage, isPublic, apiConfigId }) {
    if (!name) { const err = new Error('数字员工名称不能为空'); err.statusCode = 400; throw err }
    return Agent.create({ userId, name, avatar, systemPrompt, welcomeMessage, isPublic, apiConfigId })
  },

  findById(id) {
    const agent = Agent.findById(id)
    if (!agent) { const err = new Error('数字员工不存在'); err.statusCode = 404; throw err }
    return agent
  },

  findByUser(userId) {
    return Agent.findByUser(userId)
  },

  listAll() {
    return Agent.findAll()
  },

  update(id, fields) {
    const agent = Agent.findById(id)
    if (!agent) { const err = new Error('数字员工不存在'); err.statusCode = 404; throw err }
    const allowed = {}
    const keys = ['name', 'avatar', 'system_prompt', 'welcome_message', 'is_public', 'is_disabled', 'api_config_id']
    for (const k of keys) {
      if (fields[k] !== undefined) allowed[k] = fields[k]
    }
    return Agent.update(id, allowed)
  },

  delete(id) {
    const agent = Agent.findById(id)
    if (!agent) { const err = new Error('数字员工不存在'); err.statusCode = 404; throw err }
    Agent.delete(id)
  },

  bindSkill(agentId, skillId) {
    Agent.bindSkill(agentId, skillId)
  },

  unbindSkill(agentId, skillId) {
    Agent.unbindSkill(agentId, skillId)
  },

  getSkills(agentId) {
    return Agent.getSkills(agentId)
  },

  getAvailableSkills(agentId) {
    const bound = Agent.getSkills(agentId).map(s => s.id)
    const all = Skill.findAll({ page: 1, pageSize: 9999 }).rows
    return all.filter(s => !bound.includes(s.id))
  }
}
