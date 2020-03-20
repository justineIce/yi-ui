const ECHARTS_SETTINGS = [
  'grid', 'dataZoom', 'visualMap',
  'toolbox', 'title', 'legend',
  'xAxis', 'yAxis', 'radar',
  'tooltip', 'axisPointer', 'brush',
  'geo', 'timeline', 'graphic',
  'series', 'backgroundColor', 'textStyle'
]

function camelToKebab (s) {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
function debounce (fn, delay) {
  var timer = null
  return function () {
    var self = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(self, args)
    }, delay)
  }
}
function getStackMap (stack) {
  const stackMap = {}
  Object.keys(stack).forEach(item => {
    stack[item].forEach(name => {
      stackMap[name] = item
    })
  })
  return stackMap
}
/// / 获取指标及别名
function getMetricsAndTarget (data) {
  const metrics = [], legend = []
  data.forEach(item => {
    let arr = item.split(':')
    metrics.push(arr[0])
    legend.push(arr[1] !== undefined ? arr[1] : arr[0])
  })
  return {
    metrics: metrics,
    targets: legend
  }
}
export {
  camelToKebab,
  debounce,
  getStackMap,
  getMetricsAndTarget,
  ECHARTS_SETTINGS
}
