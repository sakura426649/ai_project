import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { authRequired } from '../middleware/auth.js'
import { registerRules, loginRules } from '../validators/auth.js'

const router = Router()
router.post('/register', registerRules, authController.register)
router.post('/login', loginRules, authController.login)
router.get('/me', authRequired, authController.me)
export default router
