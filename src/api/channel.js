import request from '@/utils/request'
export const getDefaultOrUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
export const addChannel = (id, seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [{
      id,
      seq
    }]
  })
}
