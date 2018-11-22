import axios from 'axios'

export function getTime (weekday, page) {
  const url = 'api/time'
  const data = {
    t: 1542542131978,
    weekday,
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
