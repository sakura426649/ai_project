import { Router } from 'express'
import { groupController } from '../controllers/groupController.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.get('/', authRequired, groupController.listAll)
router.get('/mine', authRequired, groupController.listMine)
router.get('/:id', authRequired, groupController.getById)
router.post('/', authRequired, groupController.create)
router.put('/:id', authRequired, groupController.update)
router.delete('/:id', authRequired, groupController.remove)
router.get('/:id/members', authRequired, groupController.getMembers)
router.post('/:id/members', authRequired, groupController.addMember)
router.delete('/:id/members/:userId', authRequired, groupController.removeMember)
router.get('/:id/agents', authRequired, groupController.getAgents)
router.post('/:id/agents', authRequired, groupController.addAgent)
router.delete('/:id/agents/:agentId', authRequired, groupController.removeAgent)
export default router
