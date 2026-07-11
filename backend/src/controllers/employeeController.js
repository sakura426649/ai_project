import { employeeService } from '../services/employeeService.js'
import { success, paginated } from '../utils/response.js'

export const employeeController = {
  async create(req, res, next) {
    try {
      const emp = await employeeService.create(req.body)
      res.status(201).json(success(emp, '员工创建成功'))
    } catch (err) { next(err) }
  },

  getById(req, res, next) {
    try {
      const emp = employeeService.findById(+req.params.id)
      res.json(success(emp))
    } catch (err) { next(err) }
  },

  list(req, res, next) {
    try {
      const { page = 1, pageSize = 20, departmentId } = req.query
      const { rows, total } = employeeService.list({ page: +page, pageSize: +pageSize, departmentId: departmentId ? +departmentId : undefined })
      res.json(paginated(rows, total, +page, +pageSize))
    } catch (err) { next(err) }
  },

  update(req, res, next) {
    try {
      const emp = employeeService.update(+req.params.id, req.body)
      res.json(success(emp, '更新成功'))
    } catch (err) { next(err) }
  },

  remove(req, res, next) {
    try {
      employeeService.delete(+req.params.id)
      res.json(success(null, '删除成功'))
    } catch (err) { next(err) }
  }
}
