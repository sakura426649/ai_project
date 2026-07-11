import { agentService } from '../services/agentService.js'
import { success } from '../utils/response.js'

export const agentController = {
  create(req, res, next) {
    try {
      const agent = agentService.create({ ...req.body, userId: req.user.id })
      res.status(201).json(success(agent, '数字员工创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const agent = agentService.findById(+req.params.id)
      res.json(success(agent))
    } catch (err) { next(err) }
  },

  listMine(req, res, next) {
    try {
      const agents = agentService.findByUser(req.user.id)
      res.json(success(agents))
    } catch (err) { next(err) }
  },

  listAll(req, res, next) {
    try {
      const agents = agentService.listAll()
      res.json(success(agents))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const agent = agentService.update(+req.params.id, req.body)
      res.json(success(agent, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      agentService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  },

  bindSkill(req, res, next) {
    try {
      agentService.bindSkill(+req.params.id, req.body.skillId)
      res.json(success(null, '技能绑定成功'))
    } catch (err) { next(err) }
  },

  unbindSkill(req, res, next) {
    try {
      agentService.unbindSkill(+req.params.id, req.body.skillId)
      res.json(success(null, '技能解绑成功'))
    } catch (err) { next(err) }
  },

  getSkills(req, res, next) {
    try {
      const skills = agentService.getSkills(+req.params.id)
      res.json(success(skills))
    } catch (err) { next(err) }
  }
}
