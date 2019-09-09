import request from '@/utils/request'
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
export const getSearchResults = (obj) => {
  return request.get('/app/v1_0/search', {
    params: {
      page: obj.page,
      // 每页显示多少条
      per_page: obj.per_page,
      // 搜素的关键字
      q: obj.q
    }
  })
}
