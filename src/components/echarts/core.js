import echartsLib from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import { camelToKebab, debounce, ECHARTS_SETTINGS } from './utils'

export default {
  render (h) {
    return h('div', {
      role: 'echarts',
      class: [camelToKebab(this.$options.name || this.$options._componentTag)],
      style: this.canvasStyle
    }, [
      h('div', {
        style: this.canvasStyle,
        ref: 'canvas'
      }),
      h('div', {
        style: {
          display: this.dataEmpty ? '' : 'none',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, .9)',
          color: '#888',
          fontSize: '14px'
        },
        domProps: {
          innerHTML: '<div style="width: 100%;height: 100%;display:flex;justify-content: center;align-items: center">暂无数据</div>'
        }
      }),
      this.$slots.default
    ])
  },
  props: {
    data: { type: [Object, Array], default () { return {} } },
    settings: { type: Object, default () { return {} } },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    tooltip: Object,
    legend: Object,
    grid:Object,
    dataZoom: { type: [Object, Array] },
    xAxis: [Object, Array],
    yAxis: [Object, Array],
    series: [Object, Array],
    // 点击事件
    events: { type: Object },
    // init 附加参数
    initOptions: { type: Object, default () { return {} } }
  },
  watch: {
    data: {
      deep: true,
      handler (v) { if (v) { this.changeHandler() } }
    },
    width: 'nextTickResize',
    height: 'nextTickResize',
    events: {
      deep: true,
      handler: 'createEventProxy'
    }
  },
  computed: {
    canvasStyle () {
      return {
        width: this.width,
        height: this.height,
        position: 'relative'
      }
    }
  },
  data () {
    return {
      time: null,
      dataEmpty: false
    }
  },
  methods: {
    // 自适应
    nextTickResize () {
      this.$nextTick(() => {
        this.resize()
      })
    },
    resize () {
      clearInterval(this.time)
      if (this.$el && this.$el.clientWidth && this.$el.clientHeight) {
        this.echartsResize()
      } else {
        this.time = setInterval(() => {
          if (this.echarts) {
            this.resize()
          }
        }, 2000)
      }
    },
    echartsResize () {
      if (this.echarts) this.echarts.resize()
    },
    addResizeListener () {
      window.addEventListener('resize', this.resizeHandler)
      this._once.onresize = true
    },
    removeResizeListener () {
      window.removeEventListener('resize', this.resizeHandler)
      this._once.onresize = false
    },
    clean () {
      this.removeResizeListener()
      this.echarts.dispose()
      if (this.time)clearInterval(this.time)
    },
    // 监听属性变化
    addWatchToProps () {
      const watchedVariable = this._watchers.map(watcher => watcher.expression)
      Object.keys(this.$props).forEach(prop => {
        if (!~watchedVariable.indexOf(prop)) {
          const opts = {}
          if (~['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(this.$props[prop]))) {
            opts.deep = true
          }
          this.$watch(prop, () => {
            this.changeHandler()
          }, opts)
        }
      })
    },
    // 点击事件
    createEventProxy () {
      const self = this
      const keys = Object.keys(this.events || {})
      // 获取当前点击事件的初值
      const getOrightData = (index) => {
        let data = this.data
        if (!(data.constructor === Object)) {
          return data[index]
        } else {
          const { source = [] } = data
          return source[index]
        }
      }
      keys.length && keys.forEach(ev => {
        if (this.registeredEvents.indexOf(ev) === -1) {
          this.registeredEvents.push(ev)
          this.echarts.on(ev, ((ev) => {
            return function (...args) {
              if (ev in self.events) {
                self.events[ev].apply(null, args.map(item => {
                  let index = item.dataIndex
                  item.source = getOrightData(index)
                  return item
                }))
              }
            }
          })(ev))
        }
      })
    },
    // 初始化
    init () {
      // if (this.data) return
      this.echarts = echartsLib.init(this.$refs.canvas, 'light', this.initOptions)
      if (this.data) this.changeHandler()
      this.createEventProxy()
      this.addResizeListener()
    },
    dataHandler () {
      if (!this.chartHandler) return
      let data = JSON.parse(JSON.stringify(this.data))
      const extra = {
        echarts: this.echarts,
        _once: this._once,
        tooltip: this.tooltip,
        legend: this.legend,
        dataZoom: this.dataZoom,
        grid:this.grid
      }
      console.log(extra)
      let options = null
      this.dataEmpty = false
      // 如果为数组则是自定义图表
      if (!(data.constructor === Object)) {
        if (data.length === 0) {
          this.dataEmpty = true
        }
        options = this.chartHandler(data, this.settings, extra)
      } else {
        const { dimensions = [], source = [] } = data
        if (!source || source.length === 0) {
          this.dataEmpty = true
        }
        options = this.chartHandler(dimensions, source instanceof Array ? source : [], this.settings, extra)
      }
      if (options) {
        this.optionsHandler(options)
      }
    },
    optionsHandler (options) {
      ECHARTS_SETTINGS.forEach(setting => {
        if (this[setting]) options[setting] = Object.assign({}, options[setting], this[setting])
      })
      this.echarts.setOption(options)
      this.resize()
    }
  },
  created () {
    this.registeredEvents = []
    this.echarts = null
    this._once = {}
    this.resizeHandler = debounce(this.resize, 300)
    this.changeHandler = debounce(this.dataHandler, 0)
    this.addWatchToProps()
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.clean()
  }
}
