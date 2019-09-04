import request from '@/utils/request'
/** @param{*}登录提交服务器的数据mobile，code */
export const login = ({
  moblie,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    moblie,
    code
  //  request({
  //     method: 'POST',
  //     url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
  //     data: this.user
    // })
  })
}
