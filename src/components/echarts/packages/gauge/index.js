import 'echarts/lib/chart/gauge'
import Core from '../../core'
import { gauge } from './main'

export default Object.assign({}, Core, {
  name: 'YiGauge',
  data () {
    this.chartHandler = gauge
    return {}
  }
})
