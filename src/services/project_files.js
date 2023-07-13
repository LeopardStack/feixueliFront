// 封装角色信息获取的请求
import request from '@/utils/request'
// import qs from 'qs'

// 获取所有项目信息，包括该项目开通了哪些权限
export const loadAllProjectsFiles = () => {
  return request({
    method: 'GET',
    url: 'training-summary/load_all_projects_files'
  })
}

// 上传培训概要文件
export const uploadSummaryFile = (data, config = {}) => {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST',
    url: 'training-summary/upload_project_summary_file',
    data: data,
    ...config
  })
}

// 获取所有培训概要文件
export const loadAllProjectsFilesFilterPages = () => {
  return request({
    method: 'GET',
    url: 'training-summary/load_all_projects_files_filter_pages'
  })
}

// 下载指定培训概要文件
export const downloadProjectSummaryFile = (fileID) => {
  return request({
    method: 'GET',
    responseType: 'blob', // 注意这里设置 responseType 为 'blob'
    url: 'training-summary/download_project_summary_file',
    params: { fileId: fileID } // 使用 params 而不是 data 来传递 URL 参数
  })
}

// 删除指定文件
export const deleteProjectSummaryFile = (fileID) => {
  return request({
    method: 'GET',
    url: 'training-summary/delete_project_summary_file',
    params: { fileId: fileID } // 使用 params 而不是 data 来传递 URL 参数
  })
}
