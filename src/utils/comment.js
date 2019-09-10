import request from '@/utils/request'
export const getComments = ({
  isArticle,
  source,
  offset,
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    type: isArticle ? 'a' : 'c',
    source,
    offset,
    limit
  })
}
