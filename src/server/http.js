import axios from 'axios'
import { Message } from 'iview'
import router from 'vue-router'
import QS from 'qs'

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://xxx/';
}

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if(token){
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.error(err)
  }
)

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }else {
      return Promise.reject(response)
    }
  },
  err => {
    if (err.response.status) {
      switch (err.response.status) {
        case 401:
          localStorage.removeItem('token')
          this.$router.push('/login')
          break
        case 403:
          Message({content: '登录过期，请重新登录', duration: 1000});
          localStorage.removeItem('token');
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
          },1000);
          break
        case 404:
          Message({message: '网络请求不存在', duration: 1500});
          break
        default:Message({message: err.response.data.message, duration: 1500})
      }
      return Promise.reject(err.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
