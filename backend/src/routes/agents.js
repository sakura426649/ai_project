import { Router } from 'express'
import { agentController } from '../controllers/agentController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, agentController.listAll)
router.get('/mine', authRequired, agentController.listMine)
router.get('/:id', authRequired, agentController.getById)
router.post('/', authRequired, agentController.create)
router.put('/:id', authRequired, agentController.update)
router.delete('/:id', authRequired, agentController.remove)
router.get('/:id/skills', authRequired, agentController.getSkills)
router.post('/:id/skills', authRequired, agentController.bindSkill)
router.delete('/:id/skills/:skillId', authRequired, agentController.unbindSkill)
export default router
