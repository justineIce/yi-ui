import echarts from 'echarts'
import Core from '../../core'

const ranking = (source, settings, extra) => {
  source = source.sort((a, b) => {
    return a.value * 1 - b.value * 1
  })
  let data = [], keys = []
  source.forEach(item => {
    data.push(item.value)
    keys.push(item.name)
  })
  // 获取最大值
  let maxD = Math.max.apply(null, data)
  let maxData = [...Array(source.length).keys()].map(item => {
    return maxD
  })
  let option = {
    grid: {
      left: '60px',
      right: '100px ',
      top: '30px',
      bottom: '30px'
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: [
      {
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: true,
          margin: 15,
          formatter: (value, index) => {
            return '{lg|' + (data.length - index) + '}'
          },
          rich: {
            lg: {
              backgroundColor: '#fff',
              color: '#1296DB',
              borderRadius: 25,
              borderColor: '#1296DB',
              borderWidth: 1,
              fontSize: 16,
              fontWeight: 600,
              align: 'center',
              width: 25,
              height: 25
            }
          }
        },
        data: keys
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#6390F0'

            }, {
              offset: 1,
              color: '#25EBE9'

            }]),
            barBorderRadius: 10
          }
        },
        data: data
      },
      {
        type: 'bar',
        barWidth: 15,
        xAxisIndex: 0,
        barGap: '-100%',
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: (e) => {
              let index = e.dataIndex
              return `${source[index].name}:${source[index].value}`
            },
            color: '#1296DB',
            fontSize: 14,
            fontWeight: 700,
            align: 'top',
            verticalAlign: 'middle',
            lineHeight: 20,
            distance: 0,
            offset:[10,0]
          }
        },
        itemStyle: {
          normal: {
            color: '#C9CBCE',
            barBorderRadius: 14
          }
        },
        zlevel: -1,
        data: maxData
      }
    ]
  }
  return option
}
export default{
  name: 'YiRanking',
  mixins: [Core],
  data () {
    this.chartHandler = ranking
    return {}
  }
}
