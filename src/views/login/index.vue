<template>
<div class="login content">
    <div class="box-img">
        <div class="img-bg img1"></div>
        <div class="img-bg img2"></div>
    </div>
    <div class="box-form">
        <div class="change-color newmimicry-protrusion">
            <span class="iconfont icon-zhuti_o"></span>
        </div>
        <div class="logon">
            <div class="title">
                <span>欢迎登录</span>
                <span>华南师范大学继续教育学院</span>
                <span class="tips">综合登录验证平台</span>
            </div>

            <div class="forms">
                <input type="text" id="nameInput" v-model="username" placeholder="用户名" class="ipts newmimicry-protrusion">
                <input type="password" id="pwdInput" v-model="password" placeholder="密码" class="ipts newmimicry-protrusion">
                <select v-model="role" class="ipts newmimicry-protrusion">
                    <option value="培训部教务员">培训部教务员</option>
                    <option value="培训教师">培训教师</option>
                    <option value="培训学员">培训学员</option>
                </select>
                <button class="login-btn newmimicry-protrusion" style="margin-top: 40px;" @click="openLink">
                    登录
                </button>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
  login
} from '@/services/user'

import { Message } from 'element-ui'

export default {
  name: 'FeixueliFrontIndex',

  data () {
    return {
      username: '',
      password: '',
      role: '培训学员'
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const changeColor = document.querySelector('.change-color')
      const img1 = document.querySelector('.img1')
      const img2 = document.querySelector('.img2')
      const root = document.documentElement
      // const boxForm = document.querySelector('.box-form')
      // const body = document.body
      let flag = 1
      changeColor.addEventListener('click', function () {
        if (flag) {
          root.style.setProperty('--colour-bg-body', 'rgb(229, 216, 207)')
          root.style.setProperty('--colour-bg-box', 'rgb(147,121,109)')
          root.style.setProperty('--colour-btn', 'rgb(147,121,109)')
          root.style.setProperty('--colour-box-shadow-top', 'rgb(160,134,121)')
          root.style.setProperty('--colour-box-shadow-bottom', 'rgb(127,105,94)')
          img1.style.opacity = '0'
          img2.style.opacity = '1'
          flag = 0
        } else {
          root.style.setProperty('--colour-bg-body', 'rgb(186, 212, 227)')
          root.style.setProperty('--colour-bg-box', 'rgb(94, 126, 162)')
          root.style.setProperty('--colour-btn', '#5e7ea2')
          root.style.setProperty('--colour-box-shadow-top', '#4c6683')
          root.style.setProperty('--colour-box-shadow-bottom', '#7096c1')
          img1.style.opacity = '1'
          img2.style.opacity = '0'
          flag = 1
        }
      })
    },
    async openLink (event) {
      event.preventDefault() // 阻止默认行为，即阻止跳转
      const data = {
        username: this.username,
        password: this.password,
        role: this.role
      }
      // 发送请求
      await login(data).then(response => {
        if (response.data.code === 200 && response.data.msg === '登录成功') {
          console.log('response', response)
          this.$store.commit('setUser', response.data.userInfo)
          if ('roleName' in response.data.userInfo) {
            const roleName = response.data.userInfo.roleName
            if (roleName === '超级管理员' || roleName === '培训部负责人' || roleName === '培训部教务员') {
              this.$router.push('/back_up')
            } else if (roleName === '培训教师') {
              this.$router.push('/teacher')
            } else if (roleName === '培训学员') {
              this.$router.push('/student')
            } else {
              console.log('其他角色')
            }
          } else {
            console.log('返回信息没有 roleName 信息')
          }
          Message.info('登录成功！')
        } else {
          console.log('response', response)
          Message.error(response.data.msg)
        }
      }).catch(error => {
        console.error('Error:', error)
        Message.error('登录失败！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/style.css';
/* 假设你的 style.scss 文件在 'src/assets/styles/' 目录下 */
@import '@/assets/asset/iconfont/iconfont.css';
</style>
