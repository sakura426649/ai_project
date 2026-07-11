import { Router } from 'express'
import { conversationController } from '../controllers/conversationController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, conversationController.listMine)
router.get('/:id', authRequired, conversationController.getById)
router.post('/', authRequired, conversationController.create)
router.put('/:id', authRequired, conversationController.update)
router.delete('/:id', authRequired, conversationController.remove)
export default router
