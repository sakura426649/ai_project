<template>
  <el-container style="height:100vh">
    <el-aside width="220px" style="background:#304156">
      <div class="logo">企业智能协同平台</div>
      <el-menu
        :default-active="currentPath"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        router
      >
        <el-menu-item index="/dashboard"><el-icon><Odometer /></el-icon><span>仪表盘</span></el-menu-item>
        <el-menu-item v-if="authStore.isAdmin" index="/users"><el-icon><User /></el-icon><span>用户管理</span></el-menu-item>
        <el-menu-item index="/departments"><el-icon><OfficeBuilding /></el-icon><span>组织架构</span></el-menu-item>
        <el-menu-item v-if="authStore.isAdmin" index="/employees"><el-icon><Avatar /></el-icon><span>员工管理</span></el-menu-item>
        <el-menu-item index="/apiconfigs"><el-icon><Setting /></el-icon><span>API 配置</span></el-menu-item>
        <el-menu-item index="/skills"><el-icon><MagicStick /></el-icon><span>技能管理</span></el-menu-item>
        <el-menu-item index="/agents"><el-icon><Robot /></el-icon><span>数字员工</span></el-menu-item>
        <el-menu-item index="/chat"><el-icon><ChatDotRound /></el-icon><span>智能对话</span></el-menu-item>
        <el-menu-item index="/groups"><el-icon><Grid /></el-icon><span>群组管理</span></el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="display:flex;align-items:center;justify-content:flex-end;border-bottom:1px solid #dcdfe6;background:#fff">
        <span style="margin-right:16px">{{ authStore.user?.username }}</span>
        <el-button text @click="logout">退出登录</el-button>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const currentPath = computed(() => route.path)

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.logo {
  height: 60px; line-height: 60px; text-align: center;
  color: #fff; font-size: 16px; font-weight: bold;
  border-bottom: 1px solid #4a5b6b;
}
.el-menu { border-right: none; }
.el-header { box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
</style>
