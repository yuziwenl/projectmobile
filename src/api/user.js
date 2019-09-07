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
export const reportArticle = ({
  target,
  type
}) => {
  return request.post(' /app/v1_0/article/reports', {
    target,
    type
  })
}
