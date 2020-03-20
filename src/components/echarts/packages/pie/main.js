
function getPieSeries (args) {
  const {
    sources,
    dimension,
    metrics,
    orient,
    radius,
    roseType
  } = args
  let series = []; let data = []
  data.push(sources)
  let seriesBase = {
    type: 'pie',
    center: orient === 'horizontal' ? ['50%', '60%'] : ['60%', '50%'],
    radius: radius,
    roseType: roseType,
    label: {
      normal: {
        formatter: '{b}\n{d}%'
      }
    }
  }
  data.forEach((item, index) => {
    let seriesItem = Object.assign({ data: [] }, seriesBase)
    seriesItem.data = item.map(row => ({
      name: row[dimension],
      value: row[metrics]
    }))
    series.push(seriesItem)
  })
  return series
}
export const pie = (dimensions, source, settings, extra) => {
  const sources = JSON.parse(JSON.stringify(source))
  const {
    dimension = dimensions[0], // 维度
    metrics = dimensions[1], // 指标
    radius = [0, '65%'],
    roseType = false
  } = settings
  // legend
  let legend = Object.assign({}, { type: 'scroll' }, extra.legend)
  let tooltip = Object.assign({}, {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  }, extra.tooltip)
  let orient = legend.orient ? legend.orient : 'horizontal'
  const series = getPieSeries({
    sources,
    dimension,
    metrics,
    orient,
    radius,
    roseType
  })
  const options = { tooltip, legend, series }
  return options
}
