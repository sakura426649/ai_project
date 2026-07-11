import { apiConfigService } from '../services/apiConfigService.js'
import { success } from '../utils/response.js'

export const apiConfigController = {
  create(req, res, next) {
    try {
      const config = apiConfigService.create({ ...req.body, userId: req.user.id })
      res.status(201).json(success(config, 'API配置创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const config = apiConfigService.findById(+req.params.id)
      res.json(success(config))
    } catch (err) { next(err) }
  },

  listMine(req, res, next) {
    try {
      const configs = apiConfigService.findByUser(req.user.id)
      res.json(success(configs))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const config = apiConfigService.update(+req.params.id, req.body)
      res.json(success(config, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      apiConfigService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  }
}
