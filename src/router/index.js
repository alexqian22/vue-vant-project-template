import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'

// 全局配置的页面默认title
import { baseTitle } from '@/config'
// 加载提示
import { Toast } from 'vant'

Vue.use(Router)
Vue.use(Toast)

// 路由模块引入
import vantDemoModule from './modules/vant-demo'

const routes = [
  {
    path: '/',
    meta: {
      title: 'vue-vant-project-template',
    },
    component: home,
  },
  {
    name: 'request',
    meta: {
      title: '请求数据示例',
    },
    component: () => import(/* webpackChunkName: "demo" */ '@/views/request-demo'),
  },
  {
    name: 'vuex',
    meta: {
      title: 'vuex示例',
    },
    component: () => import(/* webpackChunkName: "demo" */ '@/views/vuex-demo'),
  },
  ...vantDemoModule,
  {
    path: '*',
    redirect: '/',
  },
]

// 根据 name 设置 path 参数
routes.forEach((route) => {
  route.path = route.path || '/' + (route.name || '')
})

// 构建路由
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

// 设置页面title
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  title ? (document.title = title) : (document.title = baseTitle)
  Toast.loading({
    duration: 0,
    message: '加载中...',
    forbidClick: true,
  })
  next()
})

router.afterEach(() => {
  Toast.clear()
})

export default router
