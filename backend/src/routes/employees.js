import { Router } from 'express'
import { employeeController } from '../controllers/employeeController.js'
import { authRequired, adminRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, employeeController.list)
router.get('/:id', authRequired, employeeController.getById)
router.post('/', authRequired, adminRequired, employeeController.create)
router.put('/:id', authRequired, adminRequired, employeeController.update)
router.delete('/:id', authRequired, adminRequired, employeeController.remove)
export default router
