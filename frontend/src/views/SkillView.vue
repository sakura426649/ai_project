<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <h3>技能管理</h3>
      <el-button type="primary" @click="openCreate()">添加技能</el-button>
    </div>
    <el-table :data="list" v-loading="loading">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="skill_type" label="类型" width="120" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="120">
        <template #default="{row}"><el-button size="small" @click="openEdit(row)">编辑</el-button><el-button size="small" type="danger" @click="remove(row.id)">删除</el-button></template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" style="margin-top:16px;justify-content:flex-end" layout="total,prev,pager,next" @current-change="load" />
    <el-dialog v-model="dialog.visible" :title="dialog.isNew ? '添加技能' : '编辑技能'" width="500px">
      <el-form :model="dialog.form">
        <el-form-item label="名称"><el-input v-model="dialog.form.name" /></el-form-item>
        <el-form-item label="类型"><el-select v-model="dialog.form.skillType" style="width:100%"><el-option label="web_search" value="web_search" /><el-option label="data_query" value="data_query" /><el-option label="code_gen" value="code_gen" /><el-option label="custom" value="custom" /></el-select></el-form-item>
        <el-form-item label="描述"><el-input v-model="dialog.form.description" type="textarea" /></el-form-item>
        <el-form-item label="配置"><el-input v-model="dialog.form.config" type="textarea" :rows="3" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { skillAPI } from '../api/skills.js'

const list = ref([]); const loading = ref(false)
const page = ref(1); const pageSize = ref(20); const total = ref(0)
const dialog = reactive({ visible: false, isNew: true, form: {} })

async function load() { loading.value = true; try { const res = await skillAPI.list({ page: page.value, pageSize: pageSize.value }); list.value = res.data; total.value = res.meta.total } catch {} finally { loading.value = false } }
function openCreate() { dialog.isNew = true; dialog.form = { name: '', skillType: 'custom', description: '', config: '' }; dialog.visible = true }
function openEdit(row) { dialog.isNew = false; dialog.form = { id: row.id, name: row.name, skillType: row.skill_type, description: row.description, config: row.config }; dialog.visible = true }
async function save() {
  try {
    const data = { name: dialog.form.name, skillType: dialog.form.skillType, description: dialog.form.description, config: dialog.form.config }
    if (dialog.isNew) await skillAPI.create(data)
    else await skillAPI.update(dialog.form.id, data)
    ElMessage.success(dialog.isNew ? '创建成功' : '更新成功'); dialog.visible = false; load()
  } catch {}
}
async function remove(id) { try { await ElMessageBox.confirm('确定删除？', '确认', { type: 'warning' }); await skillAPI.remove(id); ElMessage.success('删除成功'); load() } catch {} }
onMounted(load)
</script>
