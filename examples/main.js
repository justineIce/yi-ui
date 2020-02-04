import Vue from 'vue'
import App from './app.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import YiUi from '../src/index';
Vue.use(YiUi)

new Vue({
    render: h => h(App)
}).$mount('#app');
