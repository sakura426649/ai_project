import { Router } from 'express'
import { skillController } from '../controllers/skillController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, skillController.list)
router.get('/:id', authRequired, skillController.getById)
router.post('/', authRequired, skillController.create)
router.put('/:id', authRequired, skillController.update)
router.delete('/:id', authRequired, skillController.remove)
export default router
