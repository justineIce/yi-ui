import 'echarts/lib/chart/pie'
import Core from '../../core'
import { pie } from './main'

export default {
  name: 'YiPie',
  mixins: [Core],
  data () {
    this.chartHandler = pie
    return {}
  }
}
