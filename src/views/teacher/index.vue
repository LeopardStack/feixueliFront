<template>
    <el-container>
        <el-header>
            <!-- 头部组件 -->
            <app-teacher-header></app-teacher-header>
        </el-header>
        <el-main>
            <!-- 设置子路由的出口 -->
            <router-view></router-view>
        </el-main>
        <el-footer>
            <app-teacher-footer></app-teacher-footer>
        </el-footer>
    </el-container>
    </template>

<script>
// 引入侧边栏组件
import AppTeacherHeader from './components/AppTeacherHeader'
import AppTeacherFooter from './components/AppTeacherFooter'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'TeacherLayout',
  components: {
    'app-teacher-header': AppTeacherHeader,
    'app-teacher-footer': AppTeacherFooter
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
