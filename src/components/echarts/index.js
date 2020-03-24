import Line from './packages/line'
import Bar from './packages/bar'
import Histogram from './packages/histogram'
import Pie from './packages/pie'
import Radar from './packages/radar'
import WordCloud from './packages/wordcloud'
import Liquidfill from './packages/liquidfill'

/**自定义**/
//男女比例图
import GenderRatio from './packages/gender-ratio'
//地图
import Map from './packages/map'
//排序图表
import RankingIcon from './packages/ranking/icon'
import Ranking from './packages/ranking/ranking'
const components = [
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

export {
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
}


// function install (Vue) {
//   components.forEach(component => {
//     Vue.component(component.name, component)
//   })
// }
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
// export default {
//   install,
//   ...components
// }
