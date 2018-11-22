import axios from 'axios'

// 获取搜索热门词条
export function getSearchHot () {
  const url = 'api/searchHot'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 搜索

export function getSearch (word) {
  const url = 'api/search'
  const data = {
    t: 1542686337728,
    word: word
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
