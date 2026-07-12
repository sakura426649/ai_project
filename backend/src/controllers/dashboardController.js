import { dashboardService } from '../services/dashboardService.js'
import { success } from '../utils/response.js'

export const dashboardController = {
  getStats(req, res, next) {
    try {
      const stats = dashboardService.getStats()
      res.json(success(stats))
    } catch (err) { next(err) }
  }
}
