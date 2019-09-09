import request from '@/utils/request'
/** 获取文章列表（登录和不登录）
 * @param {*} 参数 channel_id,timestamp,with_top */
export const getArticles = (
  obj
) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: obj.channel_id,
      timestamp: obj.timestamp,
      with_top: obj.with_top
    }
  })
}
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
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
export const getArticle = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}
