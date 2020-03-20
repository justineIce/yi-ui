import 'echarts/lib/chart/radar'
import Core from '../../core'
import { radar } from './main'

export default {
  name: 'YiRadar',
  mixins: [Core],
  data () {
    this.chartHandler = radar
    return {}
  }
}
