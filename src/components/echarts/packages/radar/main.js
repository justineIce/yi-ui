import { getMetricsAndTarget } from '../../utils'

function getRadarLegend (args) {
  let { source, dimension } = args
  let data = source.map(item => item[dimension])
  return {
    show: true,
    type: 'scroll',
    data: data
  }
}
function getRadarSetting (args) {
  const { source, metrics, targets } = args
  const setting = {
    indicator: [],
    shape: 'circle',
    center: ['50%', '55%'],
    radius: '70%'
  }
  // 获取每列值，获取最大值
  let indicator = {}
  source.forEach(item => {
    metrics.forEach(key => {
      if (!indicator[key]) {
        indicator[key] = [item[key]]
      }
      indicator[key].push(item[key])
    })
  })
  setting.indicator = metrics.map((key, index) => {
    return {
      name: targets[index],
      max: Math.max.apply(null, indicator[key])
    }
  })
  return setting
}
function getRadarSeries (args) {
  const { source, dimension, metrics } = args
  let data = source.map(item => {
    const serieData = {
      value: [],
      name: item[dimension]
    }
    Object.keys(item).forEach(key => {
      if (~metrics.indexOf(key)) {
        serieData.value.push(item[key])
      }
    })
    return serieData
  })
  let series = [{
    name: dimension,
    type: 'radar',
    data: data
  }]
  return series
}
export const radar = (dimensions, source, settings, extra) => {
  const {
    dimension = dimensions[0]
  } = settings
  let target = dimensions.slice()
  if (target.metrics) {
    target = settings.metrics
  } else {
    target.splice(dimensions.indexOf(dimension), 1)
  }
  // 获取指标及别名
  const { metrics, targets } = getMetricsAndTarget(target)
  let legend = Object.assign({}, getRadarLegend({ source, dimension }), extra.legend)
  let tooltip = Object.assign({}, { show: true }, extra.tooltip)
  let grid = Object.assign({}, { bottom: '10%' }, extra.grid)

  const radar = getRadarSetting({ source, metrics, targets })
  const series = getRadarSeries({ source, dimension, metrics, targets })
  const options = { grid, tooltip, legend, radar, series }
  return options
}
