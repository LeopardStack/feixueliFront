<template>
    <div class="app_student_header">
        <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  unique-opened router
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#F4606C">

  <!-- #545c64  D1BA74  -->
  <el-menu-item class="no-shadow" style="font-size: 20px;">
    <img style="" src="@/assets/logo_gdou.png" alt="">
  </el-menu-item>

  <el-menu-item style="padding-top: 9px; font-size: 20px;" index="/student/index"><span>个人中心</span></el-menu-item>
  <el-menu-item style="padding-top: 9px; font-size: 20px;" index="/student/project_forum" ><span>项目讨论区</span></el-menu-item>
  <el-menu-item style="padding-top: 9px; font-size: 20px;" index="/student/project_courses_learing"><span>项目课程学习</span></el-menu-item>
  <el-menu-item style="padding-top: 9px; font-size: 20px;" index="/student/project_result_display"><span>项目成果展示区</span></el-menu-item>
  <!-- 右侧用户信息展示 -->
<el-dropdown style="margin-top: 10px;: 75px; margin-left: auto; ">
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
</el-menu>

    </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'AppStudentHeader',

  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      squareUrl: '/avatar.jpg'
    }
  },

  mounted () {

  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleUserInfo () {
      Message.info('回到首页')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu{
  height: 75px;

}
.el-menu-item {
  height: 75px;
  .item{
    margin-top: 20px;
    font-size: 20px;
  }
}

.el-menu-demo {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
