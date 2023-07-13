// 封装消息信息获取的请求
import request from '@/utils/request'

// 定义消息发送接口
export const sendNotification = (message) => {
  return request({
    method: 'POST',
    url: 'users/sendNotification',
    headers: {
      'Content-Type': 'application/json'
    },
    data: message
  })
}

// 定义全部消息信息获取接口
export const getMessagesInfo = () => {
  return request({
    method: 'GET',
    url: 'messages/getMessagesInfo'
    // headers: {
    //   [store.state.user.tokenName]:
    //   JSON.parse(window.localStorage.getItem('user_scnu')) ||
    //   store.state.user.tokenValue
    // }
  })
}

// 删除消息
export const deleteMessage = (id) => {
  return request({
    method: 'POST',
    url: `messages/deleteMessage/${id}`
    // headers: {
    //   [store.state.user.tokenName]:
    //   JSON.parse(window.localStorage.getItem('user_scnu')) ||
    //   store.state.user.tokenValue
    // }
  })
}
