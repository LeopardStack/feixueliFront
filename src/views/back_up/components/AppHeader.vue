<template>
    <div class="app-header">
        <!-- 左侧面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(route, index) in breadcrumbs" :key="index" :to="route.path">
                {{ route.meta.breadcrumb }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <i class="el-icon-bell" @click="messageList"></i>
        <!-- 右侧用户信息展示 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <!-- 用户头像 -->
                <el-avatar shape="square" :size="30" :src="squareUrl"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- 给 click 点击事件设置为 native 让其具有原生 dom 元素的点击效果，
            Vue 的组件默认是需要自定义事件触发的
            -->
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUserInfo">用户信息</el-dropdown-item>
                <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <!-- 右侧消息栏 -->
        <el-drawer title="我的消息" :visible.sync="table" direction="rtl" size="20%">
            <el-descriptions title="用户信息" style="margin-left: 20px;margin-right: 20px;">
                <el-descriptions-item label="用户名">江苏省苏州市吴中区吴中大道 1188 号
                    江苏省苏州市吴中区吴中大道 1188 号 江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>
            <div style="margin-left: 20px;margin-right: 20px;margin-bottom: 10px;">江苏省苏州市吴中区吴中大道 1188 号
                江苏省苏州市吴中区吴中大道 1188 号 江苏省苏州市吴中区吴中大道 1188 号</div>
            <div style="margin-left: 20px;margin-right: 20px;">江苏省苏州市吴中区吴中大道 1188 号
                江苏省苏州市吴中区吴中大道 1188 号 江苏省苏州市吴中区吴中大道 1188 号</div>

        </el-drawer>

        <el-dialog
      title="消息通知"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>{{ notifications }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    </template>

<script>
// 引入用户信息接口功能
import {
  getUserID
} from '@/services/user'
import { Message } from 'element-ui'

export default {
  name: 'AppHeader',
  data () {
    return {
      squareUrl: '/avatar.jpg',
      // 用户信息
      userInfo: {},
      table: false, // 添加这一行
      socket: null,
      notifications: '',
      centerDialogVisible: false

    }
  },
  computed: {
    breadcrumbs () {
      const routes = this.$route.matched
      return routes.filter(route => route.meta && route.meta.breadcrumb)
    }
  },
  created () {
    // 加载用户ID
    this.loadUserID()
    this.socket = new WebSocket('ws://localhost:40000/ws')

    this.socket.onmessage = event => {
      console.log('收到的消息 ', event.data)
      this.notifications = event.data
      this.centerDialogVisible = true
      // this.$notify({
      //   title: '新消息',
      //   message: event.data,
      //   type: 'success'
      // })
    }
  },
  beforeDestroy () {
    if (this.socket) {
      this.socket.close()
    }
  },
  methods: {
    // 加载用户信息
    async loadUserID () {
      try {
        const { data } = await getUserID()
        if (data.code === 200) {
          console.log('header page ', data.userID)
        } else {
          Message.error('获取信息失败，请重新登录')
          this.$router.push('/login')
        }
      } catch (error) {
        Message.error('获取用户信息失败')
      }
    },
    // 退出功能
    handleLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log('点击提出')
        // 1.清除 store 用户信息
        this.$store.commit('setUser', null)
        // 2.跳转到登录页
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 打开消息列表页
    messageList () {
      console.log('打开消息列表')
      // this.$router.push('/platform_message')
      this.table = true
    },
    cancelForm () {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    handleUserInfo () {
      this.$router.push('/home')
    }
  }

}
</script>

    <style lang="scss" scoped>
    .app-header {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown-menu {
            display: flex;
            align-items: center;
        }

        .el-icon-bell {
            /* 添加以下样式 */
            margin-left: auto;
            padding-right: 10px;
            font-size: 25px;
            /* 调整图标大小为 20px */
            /* 添加以下样式 */
            transition: color 0.3s;
            /* 添加过渡效果 */
        }

        .el-icon-bell:hover {
            color: #f9c094;
            /* 设置鼠标悬停状态下的颜色 */
        }
    }
    </style>
