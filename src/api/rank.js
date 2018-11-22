import axios from 'axios'

export function getRank (type, page) {
  const url = 'api/rank'
  const data = {
    t: 1542328728886,
    type,
    page,
    pageSize: 10,
    style: 'items'
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
