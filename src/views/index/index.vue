<template>
    <el-container>
        <el-header>
            <!-- 头部组件 -->
            <app-index-header></app-index-header>
        </el-header>
        <el-main>
            <!-- 设置子路由的出口 -->
            <router-view></router-view>
        </el-main>
        <el-footer>
            <!-- 尾部组件 -->
            <app-index-footer></app-index-footer>
        </el-footer>
    </el-container>
    </template>

<script>
// 引入侧边栏组件
import AppIndex from './components/IndexHeader'
import AppFooter from './components/IndexFooter'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'StudentLayout',
  components: {
    'app-index-header': AppIndex,
    'app-index-footer': AppFooter
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

        .el-main{
            margin-top: 20px;
            margin-right: 0;
            margin-left: 0;
            margin-bottom: 0;
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
