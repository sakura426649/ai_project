import db from '../db/index.js'

export const Agent = {
  create({ userId, name, avatar, systemPrompt, welcomeMessage, isPublic = 0, apiConfigId }) {
    const result = db.prepare(
      `INSERT INTO agents (user_id, name, avatar, system_prompt, welcome_message, is_public, api_config_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(userId, name, avatar || null, systemPrompt || null, welcomeMessage || null, isPublic, apiConfigId || null)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM agents WHERE id = ?').get(id)
  },

  findByUser(userId) {
    return db.prepare('SELECT * FROM agents WHERE user_id = ? ORDER BY created_at DESC').all(userId)
  },

  findAll() {
    return db.prepare('SELECT * FROM agents WHERE is_disabled = 0 ORDER BY created_at DESC').all()
  },

  update(id, fields) {
    const sets = []
    const vals = []
    const allowed = ['name', 'avatar', 'system_prompt', 'welcome_message', 'is_public', 'is_disabled', 'api_config_id']
    for (const [k, v] of Object.entries(fields)) {
      if (allowed.includes(k)) { sets.push(`${k} = ?`); vals.push(v) }
    }
    if (!sets.length) return this.findById(id)
    vals.push(id)
    db.prepare(`UPDATE agents SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  delete(id) {
    db.prepare('DELETE FROM agents WHERE id = ?').run(id)
  },

  bindSkill(agentId, skillId) {
    db.prepare('INSERT OR IGNORE INTO agent_skills (agent_id, skill_id) VALUES (?, ?)').run(agentId, skillId)
  },

  unbindSkill(agentId, skillId) {
    db.prepare('DELETE FROM agent_skills WHERE agent_id = ? AND skill_id = ?').run(agentId, skillId)
  },

  getSkills(agentId) {
    return db.prepare(
      'SELECT s.* FROM skills s JOIN agent_skills ags ON s.id = ags.skill_id WHERE ags.agent_id = ?'
    ).all(agentId)
  }
}
