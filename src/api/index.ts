import axios from 'axios'
import qs from 'qs'
const request = axios.create({
  baseURL: 'http://huangjiangjun.top:9001/movie',
  timeout: 60000,
  
})
request.interceptors.request.use((config) => {
  // if (config.data) {
  //   config.data.apikey = '0df993c66c0c636e29ecbb5344252a4a'
  // }

  return config
}) 

request.interceptors.response.use(response => {
  return response.data
})

export function getInTheaters(start = 0) {
  return request.get(`/in_theaters?`+ qs.stringify({
    start,
    count: 10
  }))
}
export function geComingSoon(start = 0) {
  return request.get(`/coming_soon?` + qs.stringify({
    start,
    count: 10
  }))
}
export function getTop250(start = 0) {
  return request.get(`/top250?` + qs.stringify({
    start,
    count: 10
  }))
}
export function getSearch(start = 0) {
  return request.get(`/search?` + qs.stringify({
    start,
    count: 10
  }))
}
export function getSubject(id: string) {
  return request.get('/subject/' + id)
}
