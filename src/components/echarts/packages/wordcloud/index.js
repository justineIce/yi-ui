import 'echarts-wordcloud'
import Core from '../../core'
import { wordcloud } from './main'

export default {
  name: 'YiWordCloud',
  mixins: [Core],
  data () {
    this.chartHandler = wordcloud
    return {}
  }
}
