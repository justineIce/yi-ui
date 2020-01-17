import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/src/locale';
import CollapseTransition from 'element-ui/src/transitions/collapse-transition';

import  Card from './components/card'

Vue.use(ElementUI);

const components=[
    Card,
    CollapseTransition
]

const install = function (Vue,opts={}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    version:'0.1.0',
    locale: locale.use,
    i18n: locale.i18n,
    install,
    ...components
}
