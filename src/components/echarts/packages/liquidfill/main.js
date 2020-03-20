// https://github.com/ecomfe/echarts-liquidfill
export const liquidfill = (dimensions, source, settings, extra) => {
  const {
    dimension = dimensions[0],
    metrics = dimensions[1],
    shape = 'circle'
  } = settings
  let tooltip = { show: true }
  let baseSeries = {
    type: 'liquidFill',
    shape: shape,
    data: []
  }
  let data = source.slice().map(item => {
    return item[metrics]
  })
  baseSeries.data = data
  let series = [baseSeries]
  let options = { tooltip, series }
  return options
}
