import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径
  timeout: 20000, // 超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 用户仓库实例
    const userStore = useUserStore()
    // config配置对象，headers属性请求头，配置给服务端请求携带公共参数
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    // 返回配置对象
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  // 成功回调
  (response) => {
    // 返回响应对象
    return response.status === 200
      ? Promise.resolve(response.data)
      : Promise.reject(response.data)
  },
  // 失败回调：处理http网络错误
  (error) => {
    // 定义一个变量：存储网络错误信息
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = '未登录'
        break
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = error.response.data.message
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
