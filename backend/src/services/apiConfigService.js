import { ApiConfig } from '../models/ApiConfig.js'

export const apiConfigService = {
  create({ userId, name, baseUrl, apiKey, model }) {
    if (!name || !baseUrl || !apiKey) {
      const err = new Error('名称、Base URL、API Key 为必填'); err.statusCode = 400; throw err
    }
    return ApiConfig.create({ userId, name, baseUrl, apiKey, model })
  },

  findById(id) {
    const config = ApiConfig.findById(id)
    if (!config) { const err = new Error('API配置不存在'); err.statusCode = 404; throw err }
    return config
  },

  findByUser(userId) {
    return ApiConfig.findByUser(userId)
  },

  update(id, fields) {
    const config = ApiConfig.findById(id)
    if (!config) { const err = new Error('API配置不存在'); err.statusCode = 404; throw err }
    const allowed = {}
    if (fields.name !== undefined) allowed.name = fields.name
    if (fields.base_url !== undefined) allowed.base_url = fields.base_url
    if (fields.api_key !== undefined) allowed.api_key = fields.api_key
    if (fields.model !== undefined) allowed.model = fields.model
    return ApiConfig.update(id, allowed)
  },

  delete(id) {
    const config = ApiConfig.findById(id)
    if (!config) { const err = new Error('API配置不存在'); err.statusCode = 404; throw err }
    ApiConfig.delete(id)
  }
}
