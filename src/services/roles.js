// 封装角色信息获取的请求
import request from '@/utils/request'
import qs from 'qs'

// 定义全部角色信息获取接口
export const getRolesInfo = () => {
  return request({
    method: 'GET',
    url: 'platform-role/getRoleAllInfo'
    // headers: {
    //   [store.state.user.tokenName]:
    //   JSON.parse(window.localStorage.getItem('user_scnu')) ||
    //   store.state.user.tokenValue
    // }
  })
}

// 定义全部角色所能获取的全部权限信息获取接口
export const getPermissionsInfo = () => {
  return request({
    method: 'GET',
    url: 'permission/getPermissionsInfo'
    // headers: {
    //   [store.state.user.tokenName]:
    //   JSON.parse(window.localStorage.getItem('user_scnu')) ||
    //   store.state.user.tokenValue
    // }
  })
}
// 创建新的角色
export const createRole = (data) => {
  return request({
    method: 'POST',
    url: 'platform-role/createRole',
    data: qs.stringify(data)
  })
}
