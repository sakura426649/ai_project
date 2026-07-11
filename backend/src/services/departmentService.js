import { OrgDepartment } from '../models/OrgDepartment.js'

export const departmentService = {
  create({ name, parentId = null, sortOrder = 0 }) {
    if (!name || !name.trim()) { const err = new Error('部门名称不能为空'); err.statusCode = 400; throw err }
    return OrgDepartment.create({ name: name.trim(), parentId, sortOrder })
  },

  findById(id) {
    const dept = OrgDepartment.findById(id)
    if (!dept) { const err = new Error('部门不存在'); err.statusCode = 404; throw err }
    return dept
  },

  getAll() {
    return OrgDepartment.findAll()
  },

  getTree() {
    return OrgDepartment.getTree()
  },

  update(id, { name, parentId, sortOrder }) {
    const dept = OrgDepartment.findById(id)
    if (!dept) { const err = new Error('部门不存在'); err.statusCode = 404; throw err }
    if (parentId && parentId === id) { const err = new Error('不能将自己设为父部门'); err.statusCode = 400; throw err }
    return OrgDepartment.update(id, { name, parentId, sortOrder })
  },

  delete(id) {
    const dept = OrgDepartment.findById(id)
    if (!dept) { const err = new Error('部门不存在'); err.statusCode = 404; throw err }
    OrgDepartment.delete(id)
  }
}
