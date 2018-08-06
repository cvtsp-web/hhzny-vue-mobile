import Vue from 'vue'
import App from './App'
import router from './router'
// 引入mint-ui组件
import { Button, Cell, Field, DatetimePicker, Popup } from 'mint-ui'
// 引入REM适配函数
import { setRem } from './utils'
// 引入loading插件
import Loading from './components/Loading'
// 引入urls
import urls from './config/urls'
import storage from 'store2'

// 引入axios插件
import axios from 'axios'

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  const token = storage.session('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err => Promise.reject(err))

// 把axios挂载到Vue上
Vue.axios = axios
Vue.prototype.$axios = axios

// 设置root html字体
setRem()
window.addEventListener('resize', setRem, false)

// 将urls挂载在Vue上
Vue.prototype.$urls = urls

Vue.config.productionTip = false

// 注册mint-ui组件
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)

Vue.use(Loading)

router.beforeEach((to, from, next) => {
  if (!storage.session('token') && to.path !== '/login') {
    return next({path: '/login'})
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
