import db from '../db/index.js'

export const OrgDepartment = {
  create({ name, parentId = null, sortOrder = 0 }) {
    const result = db.prepare(
      'INSERT INTO org_departments (name, parent_id, sort_order) VALUES (?, ?, ?)'
    ).run(name, parentId, sortOrder)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    return db.prepare('SELECT * FROM org_departments WHERE id = ?').get(id)
  },

  findAll() {
    return db.prepare('SELECT * FROM org_departments ORDER BY sort_order, id').all()
  },

  getTree() {
    const all = this.findAll()
    const map = new Map()
    const roots = []
    for (const d of all) {
      map.set(d.id, { ...d, children: [] })
    }
    for (const d of all) {
      const node = map.get(d.id)
      if (d.parent_id && map.has(d.parent_id)) {
        map.get(d.parent_id).children.push(node)
      } else {
        roots.push(node)
      }
    }
    return roots
  },

  update(id, { name, parentId, sortOrder }) {
    db.prepare(
      'UPDATE org_departments SET name = ?, parent_id = ?, sort_order = ? WHERE id = ?'
    ).run(name, parentId ?? null, sortOrder ?? 0, id)
    return this.findById(id)
  },

  delete(id) {
    db.prepare('UPDATE org_departments SET parent_id = NULL WHERE parent_id = ?').run(id)
    db.prepare('DELETE FROM org_departments WHERE id = ?').run(id)
  }
}
