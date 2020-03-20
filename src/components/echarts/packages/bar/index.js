import 'echarts/lib/chart/bar'
import Core from '../../core'
import { bar } from '../histogram/main'

export default {
  name: 'YiBar',
  mixins: [Core],
  data () {
    this.chartHandler = bar
    return {}
  }
}
