import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import { initDatabase } from './db/init.js'
import routes from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import { loginLimiter } from './middleware/rateLimiter.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/auth/login', loginLimiter)
app.use('/api/v1/auth/register', loginLimiter)
app.use('/api/v1', routes)
app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use(errorHandler)
initDatabase()
app.listen(config.port, () => console.log('[Server] running on port', config.port))
export default app
