import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/',
    component: () => import('../views/LayoutView.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/UserManageView.vue'),
        meta: { title: '用户管理', icon: 'User', admin: true }
      },
      {
        path: 'departments',
        name: 'Departments',
        component: () => import('../views/DepartmentView.vue'),
        meta: { title: '组织架构', icon: 'OfficeBuilding' }
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('../views/EmployeeView.vue'),
        meta: { title: '员工管理', icon: 'Avatar', admin: true }
      },
      {
        path: 'apiconfigs',
        name: 'ApiConfigs',
        component: () => import('../views/ApiConfigView.vue'),
        meta: { title: 'API 配置', icon: 'Setting' }
      },
      {
        path: 'skills',
        name: 'Skills',
        component: () => import('../views/SkillView.vue'),
        meta: { title: '技能管理', icon: 'MagicStick' }
      },
      {
        path: 'agents',
        name: 'Agents',
        component: () => import('../views/AgentView.vue'),
        meta: { title: '数字员工', icon: 'Robot' }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('../views/ChatView.vue'),
        meta: { title: '智能对话', icon: 'ChatDotRound' }
      },
      {
        path: 'groups',
        name: 'Groups',
        component: () => import('../views/GroupView.vue'),
        meta: { title: '群组管理', icon: 'Grid' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 企业智能协同平台` : '企业智能协同平台'
  const token = localStorage.getItem('accessToken')
  if (to.path !== '/login' && to.path !== '/register' && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
