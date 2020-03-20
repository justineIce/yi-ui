import 'echarts/lib/chart/bar'
import Core from '../../core'
import { histogram } from './main'

export default {
  name: 'YiHistogram',
  mixins: [Core],
  data () {
    this.chartHandler = histogram
    return {}
  }
}
