import { Router } from 'express'
import authRoutes from './auth.js'

const router = Router()

// Day 1: Auth 完整实现
router.use('/auth', authRoutes)

// Day 2-3: 以下模块的服务层和路由待实现
// router.use('/chat', chatRoutes)
// router.use('/conversations', conversationRoutes)
// router.use('/api-configs', apiconfigRoutes)
// router.use('/agents', agentRoutes)
// router.use('/skills', skillRoutes)
// router.use('/groups', groupRoutes)
// router.use('/im', imRoutes)
// router.use('/nl2sql', nl2sqlRoutes)
// router.use('/admin', adminRoutes)
// router.use('/dashboard', dashboardRoutes)
// router.use('/admin/employees', employeeRoutes)
// router.use('/admin/departments', departmentRoutes)

export default router
