import { getStackMap, getMetricsAndTarget } from '../../utils'
function getBarXAxis (args) {
  let { dimension, sources, label } = args
  return dimension.map(item =>{
    item ={
        type: 'category',
        nameGap: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        nameLocation: 'middle',
        data: sources.map(row => row[item])
    }
    if (label){
      item.axisLabel = label
    }
    return item
  })
}
function getBarYAxis (args) {
  let { metrics } = args
  return metrics.map(item => ({
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false }
  }))
}
function getBarSeries (args) {
  const {
    metrics,
    targets,
    sources,
    showLine = [],
    stack,
    label
  } = args
  let series = []
  let dataTemp = {}
  const stackMap = stack && getStackMap(stack)
  metrics.forEach(item => { dataTemp[item] = [] })
  sources.forEach(row => {
    metrics.forEach(item => {
      dataTemp[item].push(row[item])
    })
  })
  metrics.forEach((item, index) => {
    let seriesItem = {
      name: targets[index],
      type: ~showLine.indexOf(item) ? 'line' : 'bar',
      data: dataTemp[item]
    }
    if (stack && stackMap[item])seriesItem.stack = stackMap[item]
    if (label) {
      label.position = label.position ? label.position : 'top'
      seriesItem.label = label
    }
    series.push(seriesItem)
  })
  return series
}
//柱状图
export const histogram = (dimensions, source, settings, extra) => {
  const sources = JSON.parse(JSON.stringify(source))
  const {
    dimension = [dimensions[0]], // 维度
    showLine, // 展示为折线图的指标
    stack = {}, // 堆叠
    label
  } = settings
  // 指标
  let target = dimensions.slice()
  if (settings.metrics) {
    target = settings.metrics
  } else {
    target.splice(dimensions.indexOf(dimension[0]), 1)
  }
  const { metrics, targets } = getMetricsAndTarget(target)

  let legend = Object.assign({}, { show: true, type: 'scroll' }, extra.legend, { data: targets })
  let tooltip = Object.assign({}, { show: true, trigger: 'axis' }, extra.tooltip)
  let grid = Object.assign({}, { left: '10%', right: '10%', bottom: (extra.dataZoom || (label && label.rotate))  ? '60' : '30' }, extra.grid)

  const xAxis = getBarXAxis({ dimension, sources, label })
  const yAxis = getBarYAxis({ metrics })
  const series = getBarSeries({ metrics, targets, sources, showLine, stack })

  const options = { grid, legend, tooltip, xAxis, yAxis, series }
  return options
}
// 条形图
export const bar = (dimensions, source, settings, extra) => {
  const sources = JSON.parse(JSON.stringify(source))
  const {
    dimension = [dimensions[0]], // 维度
    showLine, // 展示为折线图的指标
    stack = {}, // 堆叠
    label
  } = settings
  // 指标
  let target = dimensions.slice()
  if (settings.metrics) {
    target = settings.metrics
  } else {
    target.splice(dimensions.indexOf(dimension[0]), 1)
  }
  const { metrics, targets } = getMetricsAndTarget(target)

  let legend = Object.assign({}, { show: true, type: 'scroll' }, extra.legend, { data: targets })
  let tooltip = Object.assign({}, { show: true, trigger: 'axis' }, extra.tooltip)
  let grid = Object.assign({}, { left: '20%', right: '10%', bottom: '30' }, extra.grid)

  const xAxis = getBarYAxis({ metrics })
  const yAxis = getBarXAxis({ dimension, sources })

  const series = getBarSeries({ metrics, targets, sources, showLine, stack, label })
  const options = { grid, legend, tooltip, xAxis, yAxis, series }
  return options
}
