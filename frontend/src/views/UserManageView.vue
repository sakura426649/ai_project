<template>
  <div>
    <h3 style="margin-bottom:16px">用户管理</h3>
    <el-table :data="list" v-loading="loading" style="width:100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" width="100" />
      <el-table-column label="状态" width="80">
        <template #default="{row}">{{ row.is_disabled ? '禁用' : '正常' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="{row}">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" :type="row.is_disabled?'success':'warning'" @click="toggleDisable(row)">
            {{ row.is_disabled ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" style="margin-top:16px;justify-content:flex-end" layout="total,prev,pager,next" @current-change="load" />
    <el-dialog v-model="dialog.visible" title="编辑用户" width="400px">
      <el-form :model="dialog.form">
        <el-form-item label="角色"><el-select v-model="dialog.form.role" style="width:100%"><el-option label="admin" value="admin" /><el-option label="member" value="member" /></el-select></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="dialog.form.email" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { userAPI } from '../api/users.js'

const list = ref([]); const loading = ref(false)
const page = ref(1); const pageSize = ref(20); const total = ref(0)
const dialog = reactive({ visible: false, form: {} })

async function load() {
  loading.value = true
  try {
    const res = await userAPI.list({ page: page.value, pageSize: pageSize.value })
    list.value = res.data; total.value = res.meta.total
  } catch {} finally { loading.value = false }
}

function openEdit(row) {
  dialog.form = { id: row.id, role: row.role, email: row.email }
  dialog.visible = true
}

async function save() {
  try {
    await userAPI.update(dialog.form.id, { role: dialog.form.role, email: dialog.form.email })
    ElMessage.success('更新成功'); dialog.visible = false; load()
  } catch {}
}

async function toggleDisable(row) {
  try {
    await userAPI.update(row.id, { is_disabled: row.is_disabled ? 0 : 1 })
    ElMessage.success(row.is_disabled ? '已启用' : '已禁用'); load()
  } catch {}
}

onMounted(load)
</script>
