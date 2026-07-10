import db from '../db/index.js'

export const Group = {
  create({ name, avatar, ownerId, description }) {
    const stmt = db.prepare(`
      INSERT INTO groups_chat (name, avatar, owner_id, description)
      VALUES (?, ?, ?, ?)
    `)
    const result = stmt.run(name, avatar, ownerId, description)
    const group = this.findById(result.lastInsertRowid)
    db.prepare('INSERT INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)').run(group.id, ownerId, 'owner')
    return group
  },

  findById(id) {
    const group = db.prepare('SELECT * FROM groups_chat WHERE id = ?').get(id)
    if (group) group.members = db.prepare(`
      SELECT u.id, u.username, u.email, gm.role, gm.joined_at
      FROM group_members gm JOIN users u ON gm.user_id = u.id
      WHERE gm.group_id = ?
    `).all(id)
    return group
  },

  findByUser(userId) {
    return db.prepare(`
      SELECT g.* FROM groups_chat g
      JOIN group_members gm ON g.id = gm.group_id
      WHERE gm.user_id = ?
      ORDER BY g.updated_at DESC
    `).all(userId)
  },

  addMember(groupId, userId, role = 'member') {
    return db.prepare(
      'INSERT OR IGNORE INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)'
    ).run(groupId, userId, role)
  },

  removeMember(groupId, userId) {
    return db.prepare(
      'DELETE FROM group_members WHERE group_id = ? AND user_id = ? AND role != ?'
    ).run(groupId, userId, 'owner')
  },

  update(id, { name, avatar, description }) {
    const fields = []
    const values = []
    if (name !== undefined) { fields.push('name = ?'); values.push(name) }
    if (avatar !== undefined) { fields.push('avatar = ?'); values.push(avatar) }
    if (description !== undefined) { fields.push('description = ?'); values.push(description) }
    fields.push("updated_at = datetime('now')")
    values.push(id)
    db.prepare(`UPDATE groups_chat SET ${fields.join(', ')} WHERE id = ?`).run(...values)
    return this.findById(id)
  }
}
