import request from './request.js'

export const dashboardAPI = {
  getStats() { return request.get('/dashboard/stats') }
}
