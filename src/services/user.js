// 封装各个模块的请求
import request from '@/utils/request'
import qs from 'qs'
// 引入 Vuex 的数据
// import store from '@/store'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded'},
    url: 'platform-user/doLogin',
    // urlencoded 格式：名=值&名=值
    // data: {
    //   username: this.form.username,
    //   password: this.form.password
    // }
    data: qs.stringify(data)
  })
}

// 用户登录接口
export const logout = () => {
  return request({
    method: 'GET',
    url: 'platform-user/logOut'
  })
}

// 用户基本信息接口
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'platform-user/info'
  })
}

// 用户ID获取接口
export const getUserID = () => {
  return request({
    method: 'GET',
    url: 'platform-user/getUserID'
  })
}

// 培训记录请求接口
export const loadRecordData = grade => {
  console.log('参数 ' + grade)

  return request({
    method: 'GET',
    url: `students-luqu/${grade}`
  })
}

// 定义用户上传文件接口
export const uploadFileRequest = (file) => {
  const data = new FormData()
  data.append('file', file)
  const ret = request({
    method: 'POST',
    url: 'students-luqu/upload',
    data
  })
  console.log(ret)
  return ret
}

// 定义用户信息获取接口
export const getUserInfo2 = () => {
  return request({
    method: 'GET',
    url: 'users/getUserInfo'
    // headers: {
    //   [store.state.user.tokenName]:
    //   JSON.parse(window.localStorage.getItem('user_scnu')) ||
    //   store.state.user.tokenValue
    // }
  })
}
