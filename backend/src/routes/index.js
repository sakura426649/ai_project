import { Router } from 'express'
import authRoutes from './auth.js'
import userRoutes from './users.js'
import departmentRoutes from './departments.js'
import employeeRoutes from './employees.js'
import apiConfigRoutes from './apiconfigs.js'
import skillRoutes from './skills.js'
import agentRoutes from './agents.js'
import conversationRoutes from './conversations.js'
import messageRoutes from './messages.js'
import groupRoutes from './groups.js'

const router = Router()

// F-00: Auth (Day 1 complete)
router.use('/auth', authRoutes)

// Day 2: Service + Controller + Route layers
router.use('/users', userRoutes)
router.use('/departments', departmentRoutes)
router.use('/employees', employeeRoutes)
router.use('/apiconfigs', apiConfigRoutes)
router.use('/skills', skillRoutes)
router.use('/agents', agentRoutes)
router.use('/conversations', conversationRoutes)
router.use('/messages', messageRoutes)
router.use('/groups', groupRoutes)

export default router
