import db from '../db/index.js'

export const Message = {
  create({ senderId, receiverType = 'user', receiverId, content, messageType = 'text' }) {
    const stmt = db.prepare(`
      INSERT INTO messages (sender_id, receiver_type, receiver_id, content, message_type)
      VALUES (?, ?, ?, ?, ?)
    `)
    const result = stmt.run(senderId, receiverType, receiverId, content, messageType)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM messages WHERE id = ?').get(id)
  },

  getConversation(userId1, userId2, { limit = 50, before } = {}) {
    let sql = `
      SELECT * FROM messages
      WHERE ((sender_id = ? AND receiver_type = 'user' AND receiver_id = ?)
         OR (sender_id = ? AND receiver_type = 'user' AND receiver_id = ?))
    `
    const params = [userId1, userId2, userId2, userId1]
    if (before) { sql += ' AND id < ?'; params.push(before) }
    sql += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)
    return db.prepare(sql).all(...params).reverse()
  },

  getGroupMessages(groupId, { limit = 50, before } = {}) {
    let sql = "SELECT * FROM messages WHERE receiver_type = 'group' AND receiver_id = ?"
    const params = [groupId]
    if (before) { sql += ' AND id < ?'; params.push(before) }
    sql += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)
    return db.prepare(sql).all(...params).reverse()
  },

  setReceipt(messageId, userId, status = 'read') {
    return db.prepare(`
      INSERT INTO message_receipts (message_id, user_id, status, read_at)
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(message_id, user_id) DO UPDATE SET status = ?, read_at = datetime('now')
    `).run(messageId, userId, status, status)
  }
}
