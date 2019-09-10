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
export const sendComment = (
  // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
  obj
  // 评论的内容

  // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。

) => {
  return request.post('/app/v1_0/comments',
    {
      target: obj.target,
      content: obj.content,
      art_id: obj.art_id

    })
}
