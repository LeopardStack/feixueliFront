<template>
    <el-container>
        <el-header>
            <!-- 头部组件 -->
            <app-student-header></app-student-header>
        </el-header>
        <el-main>
            <!-- 设置子路由的出口 -->
            <router-view></router-view>
        </el-main>
        <el-footer>
            <app-student-footer></app-student-footer>
        </el-footer>
    </el-container>
    </template>

<script>
// 引入侧边栏组件
import AppStudentHeader from './components/AppHeader'
import AppStudentFooter from './components/AppFooter'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'StudentLayout',
  components: {
    'app-student-header': AppStudentHeader,
    'app-student-footer': AppStudentFooter
  }
}
</script>

    <style lang="scss" scoped>
    .el-container {
        height: 100vh;
        .el-header{
            margin: 0;
            padding: 0;
        }
        // min-width: 980px;
    }

    .app_student_footer {
        background-color: #fff;
    }

    .app_student_header {
        background-color: #fff;
    }

    .app_student_main {
        background-color: #e9eef3;
    }
    </style>
