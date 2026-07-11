import { Skill } from '../models/Skill.js'

export const skillService = {
  create({ userId, name, description, skillType, config }) {
    if (!name) { const err = new Error('技能名称不能为空'); err.statusCode = 400; throw err }
    if (!skillType) { const err = new Error('技能类型不能为空'); err.statusCode = 400; throw err }
    return Skill.create({ userId, name, description, skillType, config })
  },

  findById(id) {
    const skill = Skill.findById(id)
    if (!skill) { const err = new Error('技能不存在'); err.statusCode = 404; throw err }
    return skill
  },

  list({ page = 1, pageSize = 20, skillType } = {}) {
    if (skillType) {
      const rows = Skill.findByType(skillType)
      return { rows, total: rows.length }
    }
    return Skill.findAll({ page, pageSize })
  },

  update(id, fields) {
    const skill = Skill.findById(id)
    if (!skill) { const err = new Error('技能不存在'); err.statusCode = 404; throw err }
    const allowed = {}
    if (fields.name !== undefined) allowed.name = fields.name
    if (fields.description !== undefined) allowed.description = fields.description
    if (fields.skill_type !== undefined) allowed.skill_type = fields.skill_type
    if (fields.config !== undefined) allowed.config = fields.config
    return Skill.update(id, allowed)
  },

  delete(id) {
    const skill = Skill.findById(id)
    if (!skill) { const err = new Error('技能不存在'); err.statusCode = 404; throw err }
    Skill.delete(id)
  }
}
