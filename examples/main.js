import Vue from 'vue'
import App from './App.vue'

import Yui from '../src/index'


Vue.config.productionTip = false

Vue.use(Yui)


new Vue({
  render: h => h(App),
}).$mount('#app')
