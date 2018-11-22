// 获取推荐列表
import axios from 'axios'

export function getOthers (id, num) {
  const url = 'api/others'
  const data = {
    num,
    adpos: 911,
    comic_id: id,
    t: 1542455407117
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
