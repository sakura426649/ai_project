import { groupService } from '../services/groupService.js'
import { success } from '../utils/response.js'

export const groupController = {
  create(req, res, next) {
    try {
      const group = groupService.create({ ...req.body, createdBy: req.user.id })
      res.status(201).json(success(group, '群组创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const group = groupService.findById(+req.params.id)
      res.json(success(group))
    } catch (err) { next(err) }
  },

  listAll(req, res, next) {
    try {
      const groups = groupService.listAll()
      res.json(success(groups))
    } catch (err) { next(err) }
  },

  listMine(req, res, next) {
    try {
      const groups = groupService.listByUser(req.user.id)
      res.json(success(groups))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const group = groupService.update(+req.params.id, req.body)
      res.json(success(group, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      groupService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  },

  addMember(req, res, next) {
    try {
      groupService.addMember(+req.params.id, req.body.userId, req.body.role)
      res.json(success(null, '成员添加成功'))
    } catch (err) { next(err) }
  },

  removeMember(req, res, next) {
    try {
      groupService.removeMember(+req.params.id, req.body.userId)
      res.json(success(null, '成员移除成功'))
    } catch (err) { next(err) }
  },

  getMembers(req, res, next) {
    try {
      const members = groupService.getMembers(+req.params.id)
      res.json(success(members))
    } catch (err) { next(err) }
  },

  addAgent(req, res, next) {
    try {
      groupService.addAgent(+req.params.id, req.body.agentId)
      res.json(success(null, 'Agent添加成功'))
    } catch (err) { next(err) }
  },

  removeAgent(req, res, next) {
    try {
      groupService.removeAgent(+req.params.id, req.body.agentId)
      res.json(success(null, 'Agent移除成功'))
    } catch (err) { next(err) }
  },

  getAgents(req, res, next) {
    try {
      const agents = groupService.getAgents(+req.params.id)
      res.json(success(agents))
    } catch (err) { next(err) }
  }
}
