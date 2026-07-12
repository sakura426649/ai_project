import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '../api/auth.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('accessToken') || '')

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(credentials) {
    const res = await authAPI.login(credentials)
    token.value = res.data.accessToken
    user.value = res.data.user
    localStorage.setItem('accessToken', res.data.accessToken)
    return res
  }

  async function register(data) {
    return await authAPI.register(data)
  }

  async function fetchMe() {
    try {
      const res = await authAPI.me()
      user.value = res.data
    } catch {
      logout()
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('accessToken')
  }

  return { user, token, isLoggedIn, isAdmin, login, register, fetchMe, logout }
})
