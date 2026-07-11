import { departmentService } from '../services/departmentService.js'
import { success } from '../utils/response.js'

export const departmentController = {
  create(req, res, next) {
    try {
      const dept = departmentService.create(req.body)
      res.status(201).json(success(dept, '部门创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const dept = departmentService.findById(+req.params.id)
      res.json(success(dept))
    } catch (err) { next(err) }
  },

  list(req, res, next) {
    try {
      const depts = departmentService.getAll()
      res.json(success(depts))
    } catch (err) { next(err) }
  },

  tree(req, res, next) {
    try {
      const tree = departmentService.getTree()
      res.json(success(tree))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const dept = departmentService.update(+req.params.id, req.body)
      res.json(success(dept, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      departmentService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  }
}
