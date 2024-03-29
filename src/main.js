import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue()

const vm = new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
}).$mount('#app')

console.log(vm)
