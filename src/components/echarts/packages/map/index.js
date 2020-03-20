import echarts from 'echarts'
import 'echarts/map/js/china.js'
import Core from '../../core'

// 获取数组中的最大值
function getMaxData (data) {
  let vdata = []
  data.forEach((item) => {
    vdata.push(item.value)
  })
  return Math.max(...vdata)
}

const map = (source, settings, extra) => {
  if (!(source instanceof Array)) {
    console.log('数据类型错误，应为Array')
    return false
  }
  const data = JSON.parse(JSON.stringify(source))
  /* 获取地图数据 */
  extra.echarts.showLoading()
  var mapFeatures = echarts.getMap('china').geoJson.features
  extra.echarts.hideLoading()
  let geoCoordMap = {}
  mapFeatures.forEach(function (v) {
    // 地区名称
    let name = v.properties.name
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp
  })
  // 转化数据
  let convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  let max = 480, min = 9 // todo
  let maxSize4Pin = 50, minSize4Pin = 20
  let options = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        let obj = data.find(item => item.name === params.name)
        return `${params.name}:${obj.value}`
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: getMaxData(data),
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [0],
      inRange: {
        color: ['#00467F', '#A5CC82'] // 蓝绿
      }
    },
    geo: {
      show: true,
      map: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#9DD3FE',
          borderColor: '#3B5077'
        },
        emphasis: {
          areaColor: '#2B91B7'
        }
      }
    },
    series: [
      {
        name: '地图',
        type: 'map',
        geoIndex: 0,
        aspectScale: 0.75, // 长宽比
        showLegendSymbol: false, // 存在legend时显示
        animation: false,
        data: data
      },
      {
        name: '气泡',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin', // 气泡
        symbolSize: function (val) {
          var a = (maxSize4Pin - minSize4Pin) / (max - min)
          var b = minSize4Pin - a * min
          b = maxSize4Pin - a * max
          return a * val[2] + b
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 9
            },
            formatter: '{@[2]}'
          }
        },
        itemStyle: {
          normal: {
            color: '#F62157' // 标志颜色
          }
        },
        zlevel: 6,
        data: convertData(data)
      },
      {
        name: '点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function (val) {
          return val[2] / 10
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#05C3F9'
          }
        }
      }
    ]
  }
  return options
}

export default {
  name: 'YiMap',
  mixins: [Core],
  data () {
    this.chartHandler = map
    return {}
  }
}
