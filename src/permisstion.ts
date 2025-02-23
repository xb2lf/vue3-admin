// 路由鉴权
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 必须引入样式文件
import router from '@/router/index'
import useUserStore from '@/store/modules/user'
import pinia from '@/store'
import setting from '@/setting'

// 进度条配置
NProgress.configure({ showSpinner: false })

// 获取用户仓库实例
const userStore = useUserStore(pinia) // 组件外使用需要将最外层store实例当做参数传入

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 设置网页标题
  document.title = `${setting.title}-${to.meta.title}`
  NProgress.start()
  // 判断用户是否已经登录
  const token = userStore.token
  if (token) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const username = userStore.username
      if (username) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          // 有一种情况：刷新的时候可能是异步利用，有可能获取到用户信息，但是异步路由还没加载完成，出现页面空白的问题
          next({ ...to }) //这种写法表示动态路由加载完成后，再继续进行
        } catch (error) {
          // token过期 / token错误 / 网络错误
          // 退出登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录
    to.path === '/login'
      ? next()
      : next({ path: '/login', query: { redirect: to.path } })
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})
