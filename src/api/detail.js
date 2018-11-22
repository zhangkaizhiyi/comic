import axios from 'axios'

export function getTicket (id) {
  const url = 'api/ticket'
  const data = {
    t: 1542371518890,
    id
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDetail (id) {
  const url = 'api/detail'
  const data = {
    id
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取评论
export function getComment (id, page) {
  const url = 'api/comment'
  const data = {
    id,
    t: 1542472400505,
    page,
    pageSize: 10
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
