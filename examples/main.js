import Vue from 'vue'
import App from './app.vue'

import YiUi from '../src/index';

Vue.use(YiUi)

new Vue({
    render: h => h(App)
}).$mount('#app');
