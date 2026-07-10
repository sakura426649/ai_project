import db from '../db/index.js'

export const Skill = {
  create({ name, description, category, skillType = 'script', scriptContent, inputSchema, outputSchema, createdBy }) {
    const stmt = db.prepare(`
      INSERT INTO skills (name, description, category, skill_type, script_content, input_schema, output_schema, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(name, description, category, skillType, scriptContent,
      inputSchema ? JSON.stringify(inputSchema) : null,
      outputSchema ? JSON.stringify(outputSchema) : null,
      createdBy)
    return this.findById(result.lastInsertRowid)
  },

  findById(id) {
    const row = db.prepare('SELECT * FROM skills WHERE id = ?').get(id)
    if (row) {
      if (row.input_schema) row.input_schema = JSON.parse(row.input_schema)
      if (row.output_schema) row.output_schema = JSON.parse(row.output_schema)
    }
    return row
  },

  findAll({ category } = {}) {
    if (category) return db.prepare('SELECT * FROM skills WHERE category = ? ORDER BY id').all(category)
    return db.prepare('SELECT * FROM skills ORDER BY id').all()
  },

  update(id, data) {
    const fields = []
    const values = []
    const allowed = ['name', 'description', 'category', 'skill_type', 'script_content', 'input_schema', 'output_schema', 'status']
    for (const key of allowed) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`)
        values.push(key.includes('schema') && data[key] ? JSON.stringify(data[key]) : data[key])
      }
    }
    fields.push("updated_at = datetime('now')")
    values.push(id)
    db.prepare(`UPDATE skills SET ${fields.join(', ')} WHERE id = ?`).run(...values)
    return this.findById(id)
  },

  delete(id) {
    return db.prepare('DELETE FROM skills WHERE id = ?').run(id)
  }
}
