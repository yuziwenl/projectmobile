import request from '@/utils/request'
export const getComments = ({
  isArticle,
  source,
  offset,
  limit
}) => {
  return request.get('/app/v1_0/comments', { params: {
    // a 文章的评论   c 评论的评论
    type: isArticle ? 'a' : 'c',
    source,
    offset,
    limit
  } })
}
