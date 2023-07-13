<template>
  <div class="message">
    <h1>消息管理</h1>

    <el-row class="add-message-row">
      <el-col :span="6">
        <el-input v-model="newMessage.title" placeholder="消息标题"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="newMessage.type" placeholder="消息类型">
          <el-option label="普通消息" value="普通消息"></el-option>
          <el-option label="弹框消息" value="弹框消息"></el-option>
          <el-option label="公告消息" value="公告消息"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="newMessage.startDate"
          type="date"
          placeholder="发布日期"
          value-format="yyyy-MM-dd"
          :editable="false"
        ></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="newMessage.endDate"
          type="date"
          placeholder="截止时间"
          value-format="yyyy-MM-dd"
          :editable="false"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row class="add-message-row">
      <el-col :span="24">
        <el-input
          v-model="newMessage.content"
          type="textarea"
          placeholder="消息内容"
          :rows="3"
        ></el-input>
      </el-col>
    </el-row>

    <el-row class="add-message-row">
      <el-col :span="12">
        <el-button type="primary" @click="addMessage">添加消息</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="messages"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="消息ID" width="80"></el-table-column>
      <el-table-column prop="title" label="消息标题"></el-table-column>
      <el-table-column prop="content" label="消息内容"></el-table-column>
      <el-table-column prop="type" label="消息类型"></el-table-column>
      <el-table-column prop="startDate" label="发布日期"></el-table-column>
      <el-table-column prop="endDate" label="截止时间"></el-table-column>
      <el-table-column label="操作" width="100">
  <template slot-scope="scope">
    <el-button type="danger" size="mini" @click="deleteRow(scope.row)">删除</el-button>
  </template>
</el-table-column>
    </el-table>
  </div>
</template>

<script>
import { sendNotification, getMessagesInfo, deleteMessage } from '@/services/message'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'ProjectMessage',

  data () {
    return {
      newMessage: {
        id: '',
        title: '',
        content: '',
        type: '',
        startDate: '',
        endDate: ''
      },
      messages: []
    }
  },
  mounted () {
    this.loadData()
  },

  methods: {
    async addMessage () {
      const message = {
        title: this.newMessage.title,
        content: this.newMessage.content,
        type: this.newMessage.type,
        startDate: this.newMessage.startDate,
        endDate: this.newMessage.endDate
      }
      if (
        this.newMessage.title &&
    this.newMessage.content &&
    this.newMessage.type &&
    this.newMessage.startDate &&
    this.newMessage.endDate
      ) {
        // 执行发送消息的逻辑
        // 将消息发送到后端的逻辑
      // 发送成功后可以更新消息列表，或通过异步请求获取最新的消息列表
        try {
          console.log('即将要发送的消息 ', message)
          const { data } = await sendNotification(message)
          console.log(data)

          // this.messages.push(message)
          this.loadData()
          this.clearForm()
        } catch (error) {
          console.log('消息发送失败的原因 ', error)
          Message.error('发送消息失败')
        }
      } else {
        Message.error('请填写完整的消息信息')
      }
    },

    clearForm () {
      this.newMessage.title = ''
      this.newMessage.content = ''
      this.newMessage.type = ''
      this.newMessage.startDate = ''
      this.newMessage.endDate = ''
    },
    async loadData () {
      try {
        const { data } = await getMessagesInfo()
        console.log('消息列表 ', data.messages)
        this.messages = data.messages
      } catch (error) {
        console.log(error)
        Message.error('消息列表信息请求失败')
      }
    },
    async deleteRow (row) {
      // 显示确认弹框
      const confirmResult = await MessageBox.confirm('确定要删除该行数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      if (confirmResult === 'confirm') {
        // 发送请求给后端进行删除操作，可以使用你的后端接口进行实现
        // 示例代码，假设你的删除接口为 deleteMessage，接收一个消息 ID 进行删除
        try {
          const { data } = await deleteMessage(row.id)
          console.log(data)
          Message.success('删除成功')
          this.loadData()
        } catch (error) {
          console.log(error)
          Message.error('删除消息失败')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  padding: 20px;
}

.add-message-row {
  margin-bottom: 10px;
}
</style>
