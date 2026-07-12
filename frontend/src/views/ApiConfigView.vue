<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <h3>API 配置</h3>
      <el-button type="primary" @click="openCreate()">添加配置</el-button>
    </div>
    <el-table :data="list" v-loading="loading">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="base_url" label="Base URL" />
      <el-table-column prop="api_key" label="API Key" />
      <el-table-column prop="model" label="模型" />
      <el-table-column label="操作" width="120">
        <template #default="{row}"><el-button size="small" @click="openEdit(row)">编辑</el-button><el-button size="small" type="danger" @click="remove(row.id)">删除</el-button></template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialog.visible" :title="dialog.isNew ? '添加配置' : '编辑配置'" width="500px">
      <el-form :model="dialog.form">
        <el-form-item label="名称"><el-input v-model="dialog.form.name" /></el-form-item>
        <el-form-item label="Base URL"><el-input v-model="dialog.form.baseUrl" /></el-form-item>
        <el-form-item label="API Key"><el-input v-model="dialog.form.apiKey" /></el-form-item>
        <el-form-item label="模型"><el-input v-model="dialog.form.model" placeholder="如 gpt-4, claude-3" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { apiconfigAPI } from '../api/apiconfigs.js'

const list = ref([]); const loading = ref(false)
const dialog = reactive({ visible: false, isNew: true, form: {} })

async function load() { loading.value = true; try { const res = await apiconfigAPI.list(); list.value = res.data } catch {} finally { loading.value = false } }
function openCreate() { dialog.isNew = true; dialog.form = { name: '', baseUrl: '', apiKey: '', model: '' }; dialog.visible = true }
function openEdit(row) { dialog.isNew = false; dialog.form = { id: row.id, name: row.name, baseUrl: row.base_url, apiKey: '', model: row.model }; dialog.visible = true }
async function save() {
  try {
    if (dialog.isNew) await apiconfigAPI.create({ name: dialog.form.name, baseUrl: dialog.form.baseUrl, apiKey: dialog.form.apiKey, model: dialog.form.model })
    else {
      const data = { name: dialog.form.name, base_url: dialog.form.baseUrl, model: dialog.form.model }
      if (dialog.form.apiKey) data.api_key = dialog.form.apiKey
      await apiconfigAPI.update(dialog.form.id, data)
    }
    ElMessage.success(dialog.isNew ? '创建成功' : '更新成功'); dialog.visible = false; load()
  } catch {}
}
async function remove(id) { try { await ElMessageBox.confirm('确定删除？', '确认', { type: 'warning' }); await apiconfigAPI.remove(id); ElMessage.success('删除成功'); load() } catch {} }
onMounted(load)
</script>
