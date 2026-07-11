import { skillService } from '../services/skillService.js'
import { success, paginated } from '../utils/response.js'

export const skillController = {
  create(req, res, next) {
    try {
      const skill = skillService.create({ ...req.body, userId: req.user.id })
      res.status(201).json(success(skill, '技能创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const skill = skillService.findById(+req.params.id)
      res.json(success(skill))
    } catch (err) { next(err) }
  },

  list(req, res, next) {
    try {
      const { page = 1, pageSize = 20, skillType } = req.query
      const { rows, total } = skillService.list({ page: +page, pageSize: +pageSize, skillType })
      res.json(paginated(rows, total, +page, +pageSize))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const skill = skillService.update(+req.params.id, req.body)
      res.json(success(skill, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      skillService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  }
}
