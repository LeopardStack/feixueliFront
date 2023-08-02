// 封装各个模块的请求
import request from '@/utils/request'
// import qs from 'qs'
// 引入 Vuex 的数据
// import store from '@/store'

// 获取指定目录下的所有文件和文件夹
export const getAllVideoResourcesByDirectory = directoryName => {
  // 对 directoryName 进行编码
  const encodedDirectoryName = encodeURIComponent(directoryName)

  return request({
    method: 'GET',
    url: `/training-video-manage/get_all_resources?directoryName=${encodedDirectoryName}`
  })
}
