import axios from 'axios'

export function getClassify () {
  const url = 'api/classify'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
