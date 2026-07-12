import { Router } from 'express'
import { dashboardController } from '../controllers/dashboardController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/stats', authRequired, dashboardController.getStats)
export default router
