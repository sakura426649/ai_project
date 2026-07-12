<template>
  <div class="chat-container">
    <div class="chat-sidebar">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px">
        <h4>会话列表</h4>
        <el-button size="small" type="primary" @click="newChat">新建</el-button>
      </div>
      <div v-for="c in conversations" :key="c.id" class="chat-item" :class="{active: currentConv?.id===c.id}" @click="selectChat(c)">
        {{ c.title || `会话 #${c.id}` }}
      </div>
    </div>
    <div class="chat-main">
      <div v-if="currentConv" class="chat-messages" ref="msgBox">
        <div v-for="m in messages" :key="m.id" class="msg" :class="m.role">
          <div class="msg-role">{{ m.role === 'user' ? '我' : 'AI' }}</div>
          <div class="msg-content">{{ m.content }}</div>
        </div>
      </div>
      <div v-if="currentConv" class="chat-input">
        <el-input v-model="input" placeholder="输入消息..." @keyup.enter="send" :disabled="sending">
          <template #append><el-button @click="send" :loading="sending">发送</el-button></template>
        </el-input>
      </div>
      <div v-else class="chat-empty">选择或新建一个会话开始对话</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { conversationAPI } from '../api/conversations.js'
import { messageAPI } from '../api/messages.js'

const conversations = ref([])
const currentConv = ref(null); const messages = ref([])
const input = ref(''); const sending = ref(false)
const msgBox = ref(null)

async function loadConversations() { try { const res = await conversationAPI.list(); conversations.value = res.data } catch {} }
async function newChat() { try { const res = await conversationAPI.create({ title: '', conversationType: 'agent' }); currentConv.value = res.data; messages.value = []; await loadConversations() } catch {} }
async function selectChat(c) { currentConv.value = c; try { const res = await messageAPI.listByConversation(c.id); messages.value = res.data; await nextTick(); scrollBottom() } catch {} }
async function send() {
  if (!input.value.trim() || sending.value) return; sending.value = true
  try {
    const msg = await messageAPI.create({ conversationId: currentConv.value.id, role: 'user', content: input.value })
    messages.value.push(msg.data); input.value = ''; await nextTick(); scrollBottom()
    const ai = await messageAPI.create({ conversationId: currentConv.value.id, role: 'assistant', content: 'AI 已收到：' + msg.data.content.substring(0, 50) + '...' })
    messages.value.push(ai.data); await nextTick(); scrollBottom()
  } catch {} finally { sending.value = false }
}
function scrollBottom() { if (msgBox.value) msgBox.value.scrollTop = msgBox.value.scrollHeight }
onMounted(loadConversations)
</script>

<style scoped>
.chat-container { display:flex; height:calc(100vh - 120px); border:1px solid #dcdfe6; border-radius:4px; overflow:hidden }
.chat-sidebar { width:240px; border-right:1px solid #dcdfe6; overflow-y:auto; background:#fafafa }
.chat-item { padding:12px; cursor:pointer; border-bottom:1px solid #eee }
.chat-item.active { background:#ecf5ff; color:#409eff }
.chat-main { flex:1; display:flex; flex-direction:column }
.chat-messages { flex:1; overflow-y:auto; padding:16px }
.chat-empty { flex:1; display:flex; align-items:center; justify-content:center; color:#909399 }
.chat-input { padding:12px; border-top:1px solid #dcdfe6 }
.msg { margin-bottom:12px }
.msg.user .msg-content { background:#ecf5ff; padding:10px; border-radius:8px }
.msg.assistant .msg-content { background:#f5f7fa; padding:10px; border-radius:8px }
.msg-role { font-size:12px; color:#909399; margin-bottom:4px }
</style>
