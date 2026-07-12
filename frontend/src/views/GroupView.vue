<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <h3>群组管理</h3>
      <el-button type="primary" @click="openCreate()">创建群组</el-button>
    </div>
    <el-table :data="list" v-loading="loading">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="announcement" label="公告" />
      <el-table-column label="操作" width="320">
        <template #default="{row}">
          <el-button size="small" @click="openMembers(row)">成员</el-button>
          <el-button size="small" @click="openAgents(row)">Agents</el-button>
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Create/Edit Dialog -->
    <el-dialog v-model="dialog.visible" :title="dialog.isNew ? '创建群组' : '编辑群组'" width="500px">
      <el-form :model="dialog.form">
        <el-form-item label="名称"><el-input v-model="dialog.form.name" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="dialog.form.description" type="textarea" /></el-form-item>
        <el-form-item label="头像URL"><el-input v-model="dialog.form.avatar" placeholder="可选" /></el-form-item>
        <el-form-item label="公告"><el-input v-model="dialog.form.announcement" type="textarea" :rows="2" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialog.visible=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
    </el-dialog>

    <!-- Members Dialog -->
    <el-dialog v-model="membersDialog.visible" title="群组成员" width="500px">
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <el-input-number v-model="membersDialog.newUserId" :min="1" placeholder="用户ID" style="flex:1" />
        <el-input v-model="membersDialog.newUserRole" placeholder="角色(默认member)" style="flex:1" />
        <el-button type="primary" @click="addMember()">添加</el-button>
      </div>
      <el-table :data="membersDialog.members">
        <el-table-column prop="id" label="用户ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column label="操作" width="80">
          <template #default="{row}"><el-button size="small" type="danger" @click="removeMember(row.id)">移除</el-button></template>
        </el-table-column>
      </el-table>
      <template #footer><el-button @click="membersDialog.visible=false">关闭</el-button></template>
    </el-dialog>

    <!-- Agents Dialog -->
    <el-dialog v-model="agentsDialog.visible" title="群组Agents" width="500px">
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <el-input-number v-model="agentsDialog.newAgentId" :min="1" placeholder="Agent ID" style="flex:1" />
        <el-button type="primary" @click="addAgent()">添加</el-button>
      </div>
      <el-table :data="agentsDialog.agents">
        <el-table-column prop="id" label="Agent ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column label="操作" width="80">
          <template #default="{row}"><el-button size="small" type="danger" @click="removeAgent(row.id)">移除</el-button></template>
        </el-table-column>
      </el-table>
      <template #footer><el-button @click="agentsDialog.visible=false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { groupAPI } from '../api/groups.js'

const list = ref([])
const loading = ref(false)
const dialog = reactive({ visible: false, isNew: true, form: {} })
const membersDialog = reactive({ visible: false, members: [], newUserId: null, newUserRole: 'member', groupId: null })
const agentsDialog = reactive({ visible: false, agents: [], newAgentId: null, groupId: null })

async function load() { loading.value = true; try { const res = await groupAPI.list(); list.value = res.data } catch {} finally { loading.value = false } }

function openCreate() { dialog.isNew = true; dialog.form = { name: '', description: '', avatar: '', announcement: '' }; dialog.visible = true }
function openEdit(row) { dialog.isNew = false; dialog.form = { id: row.id, name: row.name, description: row.description, avatar: row.avatar, announcement: row.announcement }; dialog.visible = true }

async function save() {
  try {
    const data = { name: dialog.form.name, description: dialog.form.description, avatar: dialog.form.avatar, announcement: dialog.form.announcement }
    if (dialog.isNew) await groupAPI.create(data)
    else await groupAPI.update(dialog.form.id, data)
    ElMessage.success(dialog.isNew ? '创建成功' : '更新成功'); dialog.visible = false; load()
  } catch {}
}

async function remove(id) {
  try { await ElMessageBox.confirm('确定删除？', '确认', { type: 'warning' }); await groupAPI.remove(id); ElMessage.success('删除成功'); load() } catch {}
}

async function openMembers(row) {
  membersDialog.groupId = row.id; membersDialog.newUserId = null; membersDialog.newUserRole = 'member'
  try { const res = await groupAPI.getMembers(row.id); membersDialog.members = res.data } catch {}
  membersDialog.visible = true
}

async function addMember() {
  if (!membersDialog.newUserId) return
  try { await groupAPI.addMember(membersDialog.groupId, { userId: membersDialog.newUserId, role: membersDialog.newUserRole || 'member' }); ElMessage.success('添加成功'); const res = await groupAPI.getMembers(membersDialog.groupId); membersDialog.members = res.data } catch {}
}

async function removeMember(userId) {
  try { await groupAPI.removeMember(membersDialog.groupId, userId); ElMessage.success('移除成功'); const res = await groupAPI.getMembers(membersDialog.groupId); membersDialog.members = res.data } catch {}
}

async function openAgents(row) {
  agentsDialog.groupId = row.id; agentsDialog.newAgentId = null
  try { const res = await groupAPI.getAgents(row.id); agentsDialog.agents = res.data } catch {}
  agentsDialog.visible = true
}

async function addAgent() {
  if (!agentsDialog.newAgentId) return
  try { await groupAPI.addAgent(agentsDialog.groupId, { agentId: agentsDialog.newAgentId }); ElMessage.success('添加成功'); const res = await groupAPI.getAgents(agentsDialog.groupId); agentsDialog.agents = res.data } catch {}
}

async function removeAgent(agentId) {
  try { await groupAPI.removeAgent(agentsDialog.groupId, agentId); ElMessage.success('移除成功'); const res = await groupAPI.getAgents(agentsDialog.groupId); agentsDialog.agents = res.data } catch {}
}

onMounted(load)
</script>
