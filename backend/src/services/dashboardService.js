import db from '../db/index.js'

export const dashboardService = {
  getStats() {
    const users = db.prepare('SELECT COUNT(*) as count FROM users').get().count
    const agents = db.prepare('SELECT COUNT(*) as count FROM agents WHERE is_disabled = 0').get().count
    const groups = db.prepare('SELECT COUNT(*) as count FROM groups_chat').get().count
    const conversations = db.prepare('SELECT COUNT(*) as count FROM conversations').get().count
    const usageByModel = db.prepare(
      'SELECT model, SUM(prompt_tokens) as total_prompt, SUM(completion_tokens) as total_completion, SUM(total_tokens) as total_tokens, COUNT(*) as count FROM usage_records GROUP BY model'
    ).all()
    return { users, agents, groups, conversations, usageByModel }
  }
}
