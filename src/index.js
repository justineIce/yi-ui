import  Card from './components/card'
import  CountTo from './components/count-to'
import  Table from './components/table'
import  Form from './components/form'
import  FormShow from './components/form-show'
const components=[
    Card,
    Table,
    Form,
    CountTo,
    FormShow
]
const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default  {
    install,
    ...components,
}
