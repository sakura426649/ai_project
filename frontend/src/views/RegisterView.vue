<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>注册账号</h2>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名 (3-20字符)" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码 (6-30字符)" type="password" show-password prefix-icon="Lock" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱 (选填)" prefix-icon="Message" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit" style="width:100%">注册</el-button>
        </el-form-item>
      </el-form>
      <p class="link"><router-link to="/login">已有账号？去登录</router-link></p>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref(null)
const loading = ref(false)
const form = reactive({ username: '', password: '', email: '' })
const rules = {
  username: [{ required: true, min: 3, max: 20, message: '用户名需要3-20个字符', trigger: 'blur' }],
  password: [{ required: true, min: 6, max: 30, message: '密码需要6-30个字符', trigger: 'blur' }],
  email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }]
}

async function submit() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    await authStore.register(form)
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } catch {
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex; align-items: center; justify-content: center;
  height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card { width: 400px; }
.login-card h2 { text-align: center; margin-bottom: 24px; color: #303133; }
.link { text-align: center; }
.link a { color: #409eff; }
</style>
