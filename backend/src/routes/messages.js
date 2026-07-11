import { Router } from 'express'
import { messageController } from '../controllers/messageController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.post('/', authRequired, messageController.create)
router.get('/conversation/:conversationId', authRequired, messageController.listByConversation)
router.post('/usage', authRequired, messageController.recordUsage)
router.get('/usage/stats', authRequired, messageController.getUsageStats)
router.get('/usage/mine', authRequired, messageController.getUserUsage)
export default router
