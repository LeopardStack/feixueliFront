<template>
    <div class="app_index_header">
        <!-- Nav -->
        <el-menu :default-active="activeItem" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#F4606C" unique-opened router>
        <span style="font-size: 20px;margin-bottom: 10px; margin-left: 20px;">
        <a href="/"><img style="" src="@/assets/logo_gdou.png" alt=""></a>
        </span>
            <!-- <el-menu-item index="/" class="title"><span style="color: #fff;">非学历培训系统</span></el-menu-item> -->
            <span style="font-size: 30px;margin-right: auto;color: #fff;margin-left: 20px;">非学历培训平台</span>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/project_index_info">培训项目</el-menu-item>
            <el-menu-item index="/teachers_info">师资信息</el-menu-item>
            <el-menu-item index="/project_assignment">培训公告</el-menu-item>
            <el-menu-item index="/login">登录</el-menu-item>
        </el-menu>

    </div>
    </template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeItem: '1'
    }
  },
  methods: {
    handleSelect (key) {
      this.activeItem = key
    }
  },
  mounted () {

  }
}
</script>

    <style scoped>
    .el-menu-demo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
    }
    .el-menu-item{
        font-size: 20px;
    }
    .title {
        margin-right: auto;
        font-size: 30px;
    }
    </style>
