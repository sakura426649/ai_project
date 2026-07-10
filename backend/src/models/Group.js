import db from '../db/index.js'

export const Group = {
  create({ name, description, avatar, announcement, createdBy }) {
    const result = db.prepare(
      'INSERT INTO groups_chat (name, description, avatar, announcement, created_by) VALUES (?, ?, ?, ?, ?)'
    ).run(name, description || null, avatar || null, announcement || null, createdBy)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM groups_chat WHERE id = ?').get(id)
  },

  findAll() {
    return db.prepare('SELECT * FROM groups_chat ORDER BY updated_at DESC').all()
  },

  findByUser(userId) {
    return db.prepare(
      'SELECT g.* FROM groups_chat g JOIN group_members gm ON g.id = gm.group_id WHERE gm.user_id = ?'
    ).all(userId)
  },

  update(id, fields) {
    const sets = []
    const vals = []
    for (const [k, v] of Object.entries(fields)) {
      if (['name', 'description', 'avatar', 'announcement'].includes(k)) {
        sets.push(`${k} = ?`)
        vals.push(v)
      }
    }
    if (!sets.length) return this.findById(id)
    sets.push('updated_at = datetime(\'now\')')
    vals.push(id)
    db.prepare(`UPDATE groups_chat SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  delete(id) {
    db.prepare('DELETE FROM groups_chat WHERE id = ?').run(id)
  },

  addMember(groupId, userId, role = 'member') {
    db.prepare('INSERT OR IGNORE INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)').run(groupId, userId, role)
  },

  removeMember(groupId, userId) {
    db.prepare('DELETE FROM group_members WHERE group_id = ? AND user_id = ?').run(groupId, userId)
  },

  getMembers(groupId) {
    return db.prepare(
      'SELECT u.id, u.username, u.email, gm.role, gm.joined_at FROM users u JOIN group_members gm ON u.id = gm.user_id WHERE gm.group_id = ?'
    ).all(groupId)
  },

  addAgent(groupId, agentId) {
    db.prepare('INSERT OR IGNORE INTO group_agents (group_id, agent_id) VALUES (?, ?)').run(groupId, agentId)
  },

  removeAgent(groupId, agentId) {
    db.prepare('DELETE FROM group_agents WHERE group_id = ? AND agent_id = ?').run(groupId, agentId)
  },

  getAgents(groupId) {
    return db.prepare(
      'SELECT a.* FROM agents a JOIN group_agents ga ON a.id = ga.agent_id WHERE ga.group_id = ?'
    ).all(groupId)
  }
}
