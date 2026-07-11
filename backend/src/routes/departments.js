import { Router } from 'express'
import { departmentController } from '../controllers/departmentController.js'
import { authRequired, adminRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, departmentController.list)
router.get('/tree', authRequired, departmentController.tree)
router.get('/:id', authRequired, departmentController.getById)
router.post('/', authRequired, adminRequired, departmentController.create)
router.put('/:id', authRequired, adminRequired, departmentController.update)
router.delete('/:id', authRequired, adminRequired, departmentController.remove)
export default router
