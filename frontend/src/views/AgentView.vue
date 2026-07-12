<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <h3>数字员工</h3>
      <el-button type="primary" @click="openCreate()">创建数字员工</el-button>
    </div>
    <el-table :data="list" v-loading="loading">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="welcome_message" label="欢迎语" />
      <el-table-column prop="is_public" label="公开" width="80">
        <template #default="{row}">{{ row.is_public ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{row}">
          <el-button size="small" @click="openSkills(row)">技能</el-button>
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialog.visible" :title="dialog.isNew ? '创建数字员工' : '编辑数字员工'" width="500px">
      <el-form :model="dialog.form">
        <el-form-item label="名称"><el-input v-model="dialog.form.name" /></el-form-item>
        <el-form-item label="系统提示"><el-input v-model="dialog.form.systemPrompt" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="欢迎语"><el-input v-model="dialog.form.welcomeMessage" /></el-form-item>
        <el-form-item label="公开"><el-switch v-model="dialog.form.isPublic" /></el-form-item>
        <el-form-item label="API配置ID"><el-input-number v-model="dialog.form.apiConfigId" :min="1" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
    <el-dialog v-model="skillsDialog.visible" title="技能绑定" width="500px">
      <el-table :data="skillsDialog.skills">
        <el-table-column prop="name" label="技能名称" />
        <el-table-column prop="skill_type" label="类型" />
      </el-table>
      <template #footer><el-button @click="skillsDialog.visible=false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { agentAPI } from '../api/agents.js'

const list = ref([]); const loading = ref(false)
const dialog = reactive({ visible: false, isNew: true, form: {} })
const skillsDialog = reactive({ visible: false, skills: [] })

async function load() { loading.value = true; try { const res = await agentAPI.list(); list.value = res.data } catch {} finally { loading.value = false } }
function openCreate() { dialog.isNew = true; dialog.form = { name: '', systemPrompt: '', welcomeMessage: '', isPublic: false, apiConfigId: null }; dialog.visible = true }
function openEdit(row) { dialog.isNew = false; dialog.form = { id: row.id, name: row.name, systemPrompt: row.system_prompt, welcomeMessage: row.welcome_message, isPublic: !!row.is_public, apiConfigId: row.api_config_id }; dialog.visible = true }
async function save() {
  try {
    const data = { name: dialog.form.name, system_prompt: dialog.form.systemPrompt, welcome_message: dialog.form.welcomeMessage, is_public: dialog.form.isPublic ? 1 : 0, api_config_id: dialog.form.apiConfigId }
    if (dialog.isNew) { await agentAPI.create(data) } else { await agentAPI.update(dialog.form.id, data) }
    ElMessage.success(dialog.isNew ? '创建成功' : '更新成功'); dialog.visible = false; load()
  } catch {}
}
async function openSkills(row) { try { const res = await agentAPI.getSkills(row.id); skillsDialog.skills = res.data; skillsDialog.visible = true } catch {} }
async function remove(id) { try { await ElMessageBox.confirm('确定删除？', '确认', { type: 'warning' }); await agentAPI.remove(id); ElMessage.success('删除成功'); load() } catch {} }
onMounted(load)
</script>
