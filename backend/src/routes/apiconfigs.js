import { Router } from 'express'
import { apiConfigController } from '../controllers/apiConfigController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, apiConfigController.listMine)
router.get('/:id', authRequired, apiConfigController.getById)
router.post('/', authRequired, apiConfigController.create)
router.put('/:id', authRequired, apiConfigController.update)
router.delete('/:id', authRequired, apiConfigController.remove)
export default router
