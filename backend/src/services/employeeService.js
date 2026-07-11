import bcrypt from 'bcryptjs'
import { Employee } from '../models/Employee.js'

const SALT_ROUNDS = 10

export const employeeService = {
  async create({ username, name, password, phone, email, departmentId, role }) {
    if (!username || !name || !password) {
      const err = new Error('用户名、姓名、密码为必填'); err.statusCode = 400; throw err
    }
    const existing = Employee.findByUsername(username)
    if (existing) { const err = new Error('员工用户名已存在'); err.statusCode = 400; throw err }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    return Employee.create({ username, name, passwordHash, phone, email, departmentId, role })
  },

  findById(id) {
    const emp = Employee.findById(id)
    if (!emp) { const err = new Error('员工不存在'); err.statusCode = 404; throw err }
    return emp
  },

  list({ page = 1, pageSize = 20, departmentId } = {}) {
    if (departmentId) {
      const rows = Employee.findByDepartment(departmentId)
      return { rows, total: rows.length }
    }
    return Employee.findAll({ page, pageSize })
  },

  update(id, fields) {
    const emp = Employee.findById(id)
    if (!emp) { const err = new Error('员工不存在'); err.statusCode = 404; throw err }
    const mapped = {}
    if (fields.name !== undefined) mapped.name = fields.name
    if (fields.phone !== undefined) mapped.phone = fields.phone
    if (fields.email !== undefined) mapped.email = fields.email
    if (fields.department_id !== undefined) mapped.department_id = fields.department_id
    if (fields.role !== undefined) mapped.role = fields.role
    if (fields.status !== undefined) mapped.status = fields.status
    return Employee.update(id, mapped)
  },

  delete(id) {
    const emp = Employee.findById(id)
    if (!emp) { const err = new Error('员工不存在'); err.statusCode = 404; throw err }
    Employee.delete(id)
  }
}
