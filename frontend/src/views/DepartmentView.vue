<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <h3>组织架构</h3>
      <el-button type="primary" @click="openCreate()">新建部门</el-button>
    </div>
    <el-table :data="tree" v-loading="loading" row-key="id" default-expand-all style="width:100%">
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="sort_order" label="排序" width="80" />
      <el-table-column label="操作" width="200">
        <template #default="{row}">
          <el-button size="small" @click="openCreate(row.id)">添加子部门</el-button>
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialog.visible" :title="dialog.isNew ? '新建部门' : '编辑部门'" width="400px">
      <el-form :model="dialog.form">
        <el-form-item label="名称"><el-input v-model="dialog.form.name" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="dialog.form.sortOrder" :min="0" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { departmentAPI } from '../api/departments.js'

const tree = ref([]); const loading = ref(false)
const dialog = reactive({ visible: false, isNew: true, form: {} })

async function load() {
  loading.value = true
  try { const res = await departmentAPI.tree(); tree.value = res.data } catch {} finally { loading.value = false }
}
function openCreate(parentId = null) {
  dialog.isNew = true; dialog.form = { parentId, name: '', sortOrder: 0 }; dialog.visible = true
}
function openEdit(row) {
  dialog.isNew = false; dialog.form = { id: row.id, name: row.name, sortOrder: row.sort_order }; dialog.visible = true
}
async function save() {
  try {
    if (dialog.isNew) await departmentAPI.create({ name: dialog.form.name, parentId: dialog.form.parentId, sortOrder: dialog.form.sortOrder })
    else await departmentAPI.update(dialog.form.id, { name: dialog.form.name, sortOrder: dialog.form.sortOrder })
    ElMessage.success(dialog.isNew ? '创建成功' : '更新成功'); dialog.visible = false; load()
  } catch {}
}
async function remove(id) {
  try { await ElMessageBox.confirm('确定删除该部门？', '确认', { type: 'warning' }); await departmentAPI.remove(id); ElMessage.success('删除成功'); load() } catch {}
}
onMounted(load)
</script>
