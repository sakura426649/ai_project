import db from '../db/index.js'

export const Conversation = {
  create({ userId, title, conversationType = 'private', groupId, agentId }) {
    const result = db.prepare(
      'INSERT INTO conversations (user_id, title, conversation_type, group_id, agent_id) VALUES (?, ?, ?, ?, ?)'
    ).run(userId, title || null, conversationType, groupId || null, agentId || null)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM conversations WHERE id = ?').get(id)
  },

  findByUser(userId, { page = 1, pageSize = 20 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as count FROM conversations WHERE user_id = ?').get(userId).count
    const rows = db.prepare(
      'SELECT * FROM conversations WHERE user_id = ? ORDER BY pinned DESC, updated_at DESC LIMIT ? OFFSET ?'
    ).all(userId, pageSize, (page - 1) * pageSize)
    return { rows, total }
  },

  findByType(userId, conversationType) {
    return db.prepare(
      'SELECT * FROM conversations WHERE user_id = ? AND conversation_type = ? ORDER BY updated_at DESC'
    ).all(userId, conversationType)
  },

  update(id, fields) {
    const sets = []
    const vals = []
    for (const [k, v] of Object.entries(fields)) {
      if (['title', 'pinned'].includes(k)) {
        sets.push(`${k} = ?`)
        vals.push(v)
      }
    }
    if (!sets.length) return this.findById(id)
    sets.push('updated_at = datetime(\'now\')')
    vals.push(id)
    db.prepare(`UPDATE conversations SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  delete(id) {
    db.prepare('DELETE FROM conversations WHERE id = ?').run(id)
  }
}
