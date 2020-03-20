import  Card from './components/card'
import  CountTo from './components/count-to'
import  Table from './components/table'
import  Form from './components/form'
import  FormShow from './components/form-show/show'

//图表
import Line from './components/echarts/packages/line'
import Bar from './components/echarts/packages/bar'
import Histogram from './components/echarts/packages/histogram'
import Pie from './components/echarts/packages/pie'
import Radar from './components/echarts/packages/radar'
import WordCloud from './components/echarts/packages/wordcloud'
import Liquidfill from './components/echarts/packages/liquidfill'
//男女比例图
import GenderRatio from './components/echarts/packages/gender-ratio'
import Map from './components/echarts/packages/map'
//排序图表
import RankingIcon from './components/echarts/packages/ranking/icon'
import Ranking from './components/echarts/packages/ranking/ranking'
const components=[
    Card,
    Table,
    Form,
    CountTo,
    FormShow,
    //图表
    Line,
    Bar,
    Histogram,
    Pie,
    Radar,
    WordCloud,
    Liquidfill,
    GenderRatio,
    Map,
    RankingIcon,
    Ranking
]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    version:'1.0.0',
    install,
    ...components
}
