import db from '../db/index.js'

export const User = {
  create({ username, passwordHash, email, role = 'member' }) {
    const stmt = db.prepare(
      'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)'
    )
    const result = stmt.run(username, passwordHash, email || null, role)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT id, username, email, role, is_disabled, created_at FROM users WHERE id = ?').get(id)
  },

  findByUsername(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  },

  findAll({ page = 1, pageSize = 20 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as count FROM users').get().count
    const rows = db.prepare('SELECT id, username, email, role, is_disabled, created_at FROM users LIMIT ? OFFSET ?').all(pageSize, (page - 1) * pageSize)
    return { rows, total }
  },

  update(id, fields) {
    const sets = []
    const vals = []
    for (const [k, v] of Object.entries(fields)) {
      if (['email', 'role', 'is_disabled'].includes(k)) {
        sets.push(`${k} = ?`)
        vals.push(v)
      }
    }
    if (!sets.length) return this.findById(id)
    vals.push(id)
    db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  resetPassword(id, passwordHash) {
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, id)
  }
}
// F-00 Auth model layer
