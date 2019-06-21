// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import EventBus from './eventBus.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(iView)

/* 将bus对象挂载到vue原型上 */
Vue.prototype.$bus = EventBus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
