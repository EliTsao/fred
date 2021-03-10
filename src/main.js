import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import { MessageBox } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm
import 'default-passive-events'

import '@/styles/index.scss' // global css
import './assets/css/style.css'
// import svg from '../src/assets/svg'

import App from './App'
import store from './store'
import router from './router'
import VueSocketIO from './lib/socket'

import moment from 'moment'
// 定义一个全局过滤器实现日期格式化

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// Vue.component('icon-svg', svg)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  VueSocketIO,
  router,
  store,
  render: h => h(App)
})

Vue.filter('datrfmt', function(input, fmtstring) { // 当input为时间戳时，需转为Number类型
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring)
})
