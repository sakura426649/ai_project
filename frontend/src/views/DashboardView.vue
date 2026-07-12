<template>
  <div>
    <h3 style="margin-bottom:20px">仪表盘</h3>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover"><div class="stat"><div class="stat-num">{{ stats.users }}</div><div class="stat-label">用户总数</div></div></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"><div class="stat"><div class="stat-num">{{ stats.agents }}</div><div class="stat-label">数字员工</div></div></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"><div class="stat"><div class="stat-num">{{ stats.groups }}</div><div class="stat-label">群组数量</div></div></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"><div class="stat"><div class="stat-num">{{ stats.conversations }}</div><div class="stat-label">会话总数</div></div></el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px">
      <template #header>Token 用量统计</template>
      <el-table :data="stats.usageByModel" style="width:100%">
        <el-table-column prop="model" label="模型" />
        <el-table-column prop="total_prompt" label="Prompt Tokens" />
        <el-table-column prop="total_completion" label="Completion Tokens" />
        <el-table-column prop="total_tokens" label="总计 Tokens" />
        <el-table-column prop="count" label="调用次数" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { dashboardAPI } from '../api/dashboard.js'

const stats = reactive({ users: 0, agents: 0, groups: 0, conversations: 0, usageByModel: [] })

async function load() {
  try {
    const res = await dashboardAPI.getStats()
    Object.assign(stats, res.data)
  } catch {}
}

onMounted(load)
</script>

<style scoped>
.stat { text-align: center; padding: 16px; }
.stat-num { font-size: 32px; font-weight: bold; color: #409eff; }
.stat-label { margin-top: 8px; color: #909399; }
</style>
