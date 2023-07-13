<template>
    <div class="home">
      <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :precision="0" :value="value2" :title="title1"></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="培训项目类型总数">
            <template slot="formatter"> 8 </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :precision="0" decimal-separator="." :value="value1" :title="title2">
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic :value="like ? 521 : 520" title="留言数">
            <template slot="suffix">
              <span @click="like = !like" class="like">
                <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                <i class="el-icon-star-off" v-show="!like"></i>
              </span>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>

    <!-- 用户信息展示 -->
    <el-divider></el-divider>
    <el-descriptions class="margin-top" title="" :column="3" style="margin-top: 20px;" border>

      <el-descriptions-item v-if="userInfo">
  <template slot="label">
    <i class="el-icon-user"></i>
    用户ID
  </template>
  {{ userInfo.userID }}
</el-descriptions-item>

    <el-descriptions-item v-if="userInfo">
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        性别
      </template>
      {{ userInfo.gender }}
    </el-descriptions-item>
    <el-descriptions-item v-if="userInfo">
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        用户名
      </template>
      {{ userInfo.idnumber }}
    </el-descriptions-item>
    <el-descriptions-item v-if="userInfo">
      <template slot="label">
        <i class="el-icon-tickets"></i>
        邮箱
      </template>
      {{ userInfo.email }}
    </el-descriptions-item>
    <el-descriptions-item v-if="userInfo">
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      {{ userInfo.address }}
    </el-descriptions-item>
  </el-descriptions>
    </div>
</template>

<script>

import { getUserInfo } from '@/services/user'

export default {
  name: 'HomeIndex',

  data () {
    return {
      like: true,
      value1: 4000,
      value2: 30,
      title1: '培训项目总数',
      title2: '培训项目学员总数',
      userInfo: {}
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        const { data } = await getUserInfo()
        console.log('用户信息', data)
        // 使用后台数据更新 data 属性
        this.userInfo = data.userInfo
        console.log(this.userInfo.gender)
      } catch (error) {
        console.log('后台信息错误', error)
        // this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
  }
</style>
