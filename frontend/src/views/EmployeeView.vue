<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <h3>员工管理</h3>
      <el-button type="primary" @click="openCreate()">添加员工</el-button>
    </div>
    <el-table :data="list" v-loading="loading">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="department_name" label="部门" />
      <el-table-column prop="role" label="角色" width="100" />
      <el-table-column label="操作" width="120">
        <template #default="{row}">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" style="margin-top:16px;justify-content:flex-end" layout="total,prev,pager,next" @current-change="load" />
    <el-dialog v-model="dialog.visible" :title="dialog.isNew ? '添加员工' : '编辑员工'" width="500px">
      <el-form :model="dialog.form">
        <el-form-item label="用户名"><el-input v-model="dialog.form.username" :disabled="!dialog.isNew" /></el-form-item>
        <el-form-item label="姓名"><el-input v-model="dialog.form.name" /></el-form-item>
        <el-form-item v-if="dialog.isNew" label="密码"><el-input v-model="dialog.form.password" type="password" /></el-form-item>
        <el-form-item label="电话"><el-input v-model="dialog.form.phone" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="dialog.form.email" /></el-form-item>
        <el-form-item label="部门ID"><el-input-number v-model="dialog.form.departmentId" :min="1" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { employeeAPI } from '../api/employees.js'

const list = ref([]); const loading = ref(false)
const page = ref(1); const pageSize = ref(20); const total = ref(0)
const dialog = reactive({ visible: false, isNew: true, form: {} })

async function load() {
  loading.value = true
  try { const res = await employeeAPI.list({ page: page.value, pageSize: pageSize.value }); list.value = res.data; total.value = res.meta.total } catch {} finally { loading.value = false }
}
function openCreate() { dialog.isNew = true; dialog.form = { username: '', name: '', password: '', phone: '', email: '', departmentId: null }; dialog.visible = true }
function openEdit(row) { dialog.isNew = false; dialog.form = { id: row.id, name: row.name, phone: row.phone, email: row.email, departmentId: row.department_id }; dialog.visible = true }
async function save() {
  try {
    if (dialog.isNew) await employeeAPI.create(dialog.form)
    else await employeeAPI.update(dialog.form.id, { name: dialog.form.name, phone: dialog.form.phone, email: dialog.form.email, department_id: dialog.form.departmentId })
    ElMessage.success(dialog.isNew ? '创建成功' : '更新成功'); dialog.visible = false; load()
  } catch {}
}
async function remove(id) {
  try { await ElMessageBox.confirm('确定删除？', '确认', { type: 'warning' }); await employeeAPI.remove(id); ElMessage.success('删除成功'); load() } catch {}
}
onMounted(load)
</script>
