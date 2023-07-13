// 封装消息信息获取的请求
import request from '@/utils/request'
import qs from 'qs'

// 定义全部用户的权限信息获取接口
export const getPermissionsInfo = () => {
  return request({
    method: 'GET',
    url: 'permission/getPermissionsInfo'
  })
}

// 改变指定用户的角色信息，进而改变其权限

export const changeRole = (changeRoleDTO) => {
  return request({
    method: 'Post',
    url: 'permissions/changeRole',
    data: changeRoleDTO
    // headers: {
    //   [store.state.user.tokenName]:
    //   JSON.parse(window.localStorage.getItem('user_scnu')) ||
    //   store.state.user.tokenValue
    // }
  })
}

// 添加新的权限
export const createPermission = (data) => {
  return request({
    method: 'Post',
    url: 'permission/addNewPermission',
    data: qs.stringify(data)
  })
}

// 添加新的权限
export const updatePermissionService = (data) => {
  return request({
    method: 'Post',
    url: 'permission/updatePermission',
    data: qs.stringify(data)
  })
}
// 删除权限
export const deletePermissionService = (data) => {
  return request({
    method: 'Post',
    url: 'permission/deletePermission',
    data: qs.stringify(data)
  })
}
// 获取所有用户的权限树
export const getUserPermissionsInfo = () => {
  return request({
    method: 'Post',
    url: 'permission/getUserPermissionsInfo'
  })
}
// 获取所有权限控制的资源
export const getPermissionsInfoForRole = () => {
  return request({
    method: 'Post',
    url: 'permission/getPermissionsInfoForRole'
  })
}
// 更新角色所控制的资源
export const updateRoleResources = (data) => {
  return request({
    method: 'POST',
    url: 'platform-role/updateRolePermission',
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
}
