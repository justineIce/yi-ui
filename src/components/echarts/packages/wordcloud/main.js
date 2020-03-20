// sizeRange: [12, 60],
export const wordcloud = (dimensions, source, settings, extra) => {
  const {
    dimension = dimensions[0],
    metrics = dimensions[1],
    shape = 'circle',
    maxSize = 60,
    minSize = 12
  } = settings
  let tooltip = { show: true }
  let baseSeries = {
    type: 'wordCloud',
    shape: shape,
    width: '80%',
    height: '80%',
    sizeRange: [minSize, maxSize],
    textStyle: {
      normal: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')'
        }
      },
      emphasis: {
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    data: []
  }
  let data = source.slice().map(item => {
    return {
      name: item[dimension],
      value: item[metrics]
    }
  })
  baseSeries.data = data
  let series = [baseSeries]
  let options = { tooltip, series }
  return options
}
