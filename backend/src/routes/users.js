import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { authRequired, adminRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, adminRequired, userController.list)
router.get('/:id', authRequired, adminRequired, userController.getById)
router.put('/:id', authRequired, adminRequired, userController.update)
export default router
