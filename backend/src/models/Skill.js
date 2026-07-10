import db from '../db/index.js'

export const Skill = {
  create({ userId, name, description, skillType, config }) {
    const result = db.prepare(
      'INSERT INTO skills (user_id, name, description, skill_type, config) VALUES (?, ?, ?, ?, ?)'
    ).run(userId ?? null, name, description || null, skillType, config || null)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM skills WHERE id = ?').get(id)
  },

  findAll({ page = 1, pageSize = 20 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as count FROM skills').get().count
    const rows = db.prepare('SELECT * FROM skills ORDER BY created_at DESC LIMIT ? OFFSET ?').all(pageSize, (page - 1) * pageSize)
    return { rows, total }
  },

  findByType(skillType) {
    return db.prepare('SELECT * FROM skills WHERE skill_type = ?').all(skillType)
  },

  update(id, fields) {
    const sets = []
    const vals = []
    for (const [k, v] of Object.entries(fields)) {
      if (['name', 'description', 'skill_type', 'config'].includes(k)) {
        sets.push(`${k} = ?`)
        vals.push(v)
      }
    }
    if (!sets.length) return this.findById(id)
    vals.push(id)
    db.prepare(`UPDATE skills SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  delete(id) {
    db.prepare('DELETE FROM skills WHERE id = ?').run(id)
  }
}
