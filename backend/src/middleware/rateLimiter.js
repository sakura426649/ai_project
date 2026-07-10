import rateLimit from 'express-rate-limit'
export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, max: 10,
  message: { success: false, message: '请求过于频繁，请稍后再试' },
  standardHeaders: true, legacyHeaders: false
})
