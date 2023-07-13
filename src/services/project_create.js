// 封装角色信息获取的请求
import request from '@/utils/request'
import qs from 'qs'

// 定义全部角色信息获取接口
export const createNewProject = (data) => {
  return request({
    method: 'POST',
    url: 'training-project/create_new_project',
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
}

// 获取所有项目信息，包括该项目开通了哪些权限
export const getProjects = () => {
  return request({
    method: 'GET',
    url: 'training-project/getAllProjectsInfo'
  })
}
export const deleteProject = (data) => {
  return request({
    method: 'POST',
    url: 'training-project/deleteProject',
    data: qs.stringify(data)
  })
}
export const updateProject = (data) => {
  return request({
    method: 'POST',
    url: 'training-project/update_project',
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
}
