import axios from 'axios'
// 获取每日推荐
export function getRecommend () {
  const url = '/api/recommend'
  const data = {
    num: 6,
    adpos: 910,
    t: 1542142600098
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取首页
export function getIndex () {
  const url = '/api/index'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
