import db from '../db/index.js'

export const UsageRecord = {
  create({ userId, model, promptTokens = 0, completionTokens = 0 }) {
    const result = db.prepare(
      'INSERT INTO usage_records (user_id, model, prompt_tokens, completion_tokens, total_tokens) VALUES (?, ?, ?, ?, ?)'
    ).run(userId, model, promptTokens, completionTokens, promptTokens + completionTokens)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM usage_records WHERE id = ?').get(id)
  },

  findByUser(userId, { page = 1, pageSize = 20 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as count FROM usage_records WHERE user_id = ?').get(userId).count
    const rows = db.prepare(
      'SELECT * FROM usage_records WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
    ).all(userId, pageSize, (page - 1) * pageSize)
    return { rows, total }
  },

  getStats() {
    return db.prepare(
      'SELECT model, SUM(prompt_tokens) as total_prompt, SUM(completion_tokens) as total_completion, SUM(total_tokens) as total_tokens, COUNT(*) as count FROM usage_records GROUP BY model'
    ).all()
  }
}
