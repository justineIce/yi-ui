import 'echarts-liquidfill'
import Core from '../../core'
import { liquidfill } from './main'

export default {
  name: 'YiLiquidfill',
  mixins: [Core],
  data () {
    this.chartHandler = liquidfill
    return {}
  }
}
