import 'echarts/lib/chart/line'
import Core from '../../core'
import { line } from './main'

export default {
  name: 'YiLine',
  mixins: [Core],
  data () {
    this.chartHandler = line
    return {}
  }
}
