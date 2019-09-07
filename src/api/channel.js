import request from '@/utils/request'
export const getDefaultOrUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
