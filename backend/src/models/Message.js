import db from '../db/index.js'

export const Message = {
  create({ conversationId, role, content, senderName, senderAvatar }) {
    const result = db.prepare(
      'INSERT INTO messages (conversation_id, role, content, sender_name, sender_avatar) VALUES (?, ?, ?, ?, ?)'
    ).run(conversationId, role, content, senderName || null, senderAvatar || null)
    db.prepare('UPDATE conversations SET updated_at = datetime(\'now\') WHERE id = ?').run(conversationId)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM messages WHERE id = ?').get(id)
  },

  findByConversation(conversationId, { page = 1, pageSize = 50 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as count FROM messages WHERE conversation_id = ?').get(conversationId).count
    const rows = db.prepare(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC LIMIT ? OFFSET ?'
    ).all(conversationId, pageSize, (page - 1) * pageSize)
    return { rows, total }
  }
}
