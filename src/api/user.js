import request from '@/utils/request'
/** @param{*}登录提交服务器的数据mobile，code */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  //  request({
  //     method: 'POST',
  //     url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
  //     data: this.user
    // })
  })
}
export const blacklists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}
export const followUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    target: id
  })
}
// 取消关注用户
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}
export const getUserInfo = () => {
  return request.get('/app/v1_0/user')
}
// 获取当前登录的用户的资料
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}
