import db from '../db/index.js'

export const ApiConfig = {
  create({ userId, name, baseUrl, apiKey, model }) {
    const result = db.prepare(
      'INSERT INTO api_configs (user_id, name, base_url, api_key, model) VALUES (?, ?, ?, ?, ?)'
    ).run(userId, name, baseUrl, apiKey, model)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    const row = db.prepare('SELECT * FROM api_configs WHERE id = ?').get(id)
    if (row) row.api_key = this.maskKey(row.api_key)
    return row
  },

  findByUser(userId) {
    return db.prepare('SELECT * FROM api_configs WHERE user_id = ? ORDER BY created_at DESC').all(userId)
  },

  update(id, fields) {
    const sets = []
    const vals = []
    for (const [k, v] of Object.entries(fields)) {
      if (['name', 'base_url', 'api_key', 'model'].includes(k)) {
        sets.push(`${k} = ?`)
        vals.push(v)
      }
    }
    if (!sets.length) return this.findById(id)
    vals.push(id)
    db.prepare(`UPDATE api_configs SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  delete(id) {
    db.prepare('DELETE FROM api_configs WHERE id = ?').run(id)
  },

  maskKey(key) {
    if (!key || key.length < 8) return key
    return key.slice(0, 3) + '****' + key.slice(-4)
  }
}
