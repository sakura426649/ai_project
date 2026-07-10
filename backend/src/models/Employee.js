import db from '../db/index.js'

export const Employee = {
  create({ username, name, passwordHash, phone, email, departmentId, role = 'employee' }) {
    const result = db.prepare(
      'INSERT INTO employees (username, name, password_hash, phone, email, department_id, role) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(username, name, passwordHash, phone || null, email || null, departmentId || null, role)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM employees WHERE id = ?').get(id)
  },

  findByUsername(username) {
    return db.prepare('SELECT * FROM employees WHERE username = ?').get(username)
  },

  findAll({ page = 1, pageSize = 20 } = {}) {
    const total = db.prepare('SELECT COUNT(*) as count FROM employees').get().count
    const rows = db.prepare(
      'SELECT e.*, d.name as department_name FROM employees e LEFT JOIN org_departments d ON e.department_id = d.id ORDER BY e.created_at DESC LIMIT ? OFFSET ?'
    ).all(pageSize, (page - 1) * pageSize)
    return { rows, total }
  },

  findByDepartment(departmentId) {
    return db.prepare('SELECT * FROM employees WHERE department_id = ?').all(departmentId)
  },

  update(id, fields) {
    const sets = []
    const vals = []
    for (const [k, v] of Object.entries(fields)) {
      if (['name', 'phone', 'email', 'department_id', 'role', 'status'].includes(k)) {
        sets.push(`${k} = ?`)
        vals.push(v)
      }
    }
    if (!sets.length) return this.findById(id)
    vals.push(id)
    db.prepare(`UPDATE employees SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
    return this.findById(id)
  },

  resetPassword(id, passwordHash) {
    db.prepare('UPDATE employees SET password_hash = ? WHERE id = ?').run(passwordHash, id)
  },

  delete(id) {
    db.prepare('DELETE FROM employees WHERE id = ?').run(id)
  }
}
