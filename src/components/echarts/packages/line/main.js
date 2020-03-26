import { getStackMap, getMetricsAndTarget } from '../../utils'
function getLineXAxis (args) {
  let { dimension, sources, label } = args
  return dimension.map(item => ({
    type: 'category',
    nameGap: 20,
    axisLine: { show: false },
    axisTick: { show: false },
    nameLocation: 'middle',
    data: sources.map(row => row[item]),
    axisLabel: label
  }))
}
function getLineYAxis (args) {
  let { metrics } = args
  return metrics.map(item => ({
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false }
  }))
}
function getLineSeries (args) {
  const {
    metrics, // 指标
    targets,
    sources,
    stack,
    area
  } = args
  let series = []
  let dataTemp = {}
  const stackMap = stack && getStackMap(stack)
  metrics.forEach(item => { dataTemp[item] = [] })
  sources.forEach(row => {
    metrics.forEach(item => {
      let value = null
      if (row[item] != null) {
        value = row[item]
      }
      dataTemp[item].push(value)
    })
  })
  metrics.forEach((item, index) => {
    let seriesItem = {
      name: targets[index],
      type: 'line',
      smooth: true,
      data: dataTemp[item]
    }
    if (stack && stackMap[item])seriesItem.stack = stackMap[item]
    if (area)seriesItem.areaStyle = { normal: {} }
    series.push(seriesItem)
  })
  return series
}

export const line = (dimensions, source, settings, extra) => {
  const sources = JSON.parse(JSON.stringify(source))
  const {
    dimension = [dimensions[0]], // 维度
    stack = {}, // 堆叠
    area = false,
    label={}
  } = settings
  // 指标
  let target = dimensions.slice()
  if (settings.metrics) {
    target = settings.metrics
  } else {
    target.splice(dimensions.indexOf(dimension[0]), 1)
  }
  // 获取指标及别名
  const { metrics, targets } = getMetricsAndTarget(target)
  let legend = Object.assign({}, { show: true, type: 'scroll' }, extra.legend, { data: targets })
  let tooltip = Object.assign({}, { show: true, trigger: 'axis' }, extra.tooltip)
  let grid = Object.assign({}, { left: '10%', right: '10%', bottom: (extra.dataZoom || label.rotate   ? '60' : '30')}, extra.grid)

  const xAxis = getLineXAxis({ dimension, sources,label })
  const yAxis = getLineYAxis({ metrics })
  const series = getLineSeries({ metrics, targets, sources, stack, area })
  const options = { grid, legend, tooltip, xAxis, yAxis, series }
  return options
}
