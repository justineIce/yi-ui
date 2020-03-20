import echarts from 'echarts'
import Core from '../../core'

const genderRatio = (source, settings, extra) => {
  if (!(source instanceof Array)) {
    console.log('数据类型错误，应为Array')
    return false
  }
  const data = JSON.parse(JSON.stringify(source))

  let value1 = data[0], value2 = data[1]

  let options = {
    grid: {
      left: '10px',
      right: '60px'
    },
    xAxis: { type: 'value', show: false },
    yAxis: { type: 'category', show: false },
    series: [
      {
        name: '男',
        data: [value1],
        type: 'bar',
        stack: '总量',
        barWidth: 25,
        cursor: 'default',
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: '#FFFFFF',
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: '#57eabf' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#2563f9' // 100% 处的颜色
            }], false),
            barBorderRadius: 14
          }
        },
        label: {
          show: true,
          padding: [0, 0, 50, 0],
          fontSize: 20,
          color: '#333333',
          formatter ($data) {
            return Math.abs($data.data).toFixed(2) + '%'
          }
        },
        markPoint: {
          symbol: 'image://data:image/svg+xml;base64,PHN2ZyBpZD0i57uEXzI5MDgiIGRhdGEtbmFtZT0i57uEIDI5MDgiIHhtbG5zPSJodHR' +
                      'wOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9' +
                      'IjAgMCAzNi45OTkgNzEuNDgiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6IHVybCgjb' +
                      'GluZWFyLWdyYWRpZW50KTsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW' +
                      '50IiB4MT0iMC41IiB5MT0iLTAuMzU2IiB4Mj0iMC41IiB5Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgo' +
                      'gICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxYmM4ZmMiIHN0b3Atb3BhY2l0eT0iMC43OCIvPgogICAgICA8c3Rv' +
                      'cCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMTg0YjkiIHN0b3Atb3BhY2l0eT0iMC42OTQiLz4KICAgIDwvbGluZWFyR3JhZGllb' +
                      'nQ+CiAgPC9kZWZzPgogIDxwYXRoIGlkPSLot6/lvoRfMjM1IiBkYXRhLW5hbWU9Iui3r+W+hCAyMzUiIGNsYXNzPSJjbHMtMSIgZD' +
                      '0iTTEyLjg5MSwxNDguMzc5QTE4Ljg3NiwxOC44NzYsMCwwLDAsMCwxNjYuNDg2djEyLjkyMWExLjE2NywxLjE2NywwLDAsMCwxLjE' +
                      '1NiwxLjE1Nkg3LjM5NHYxNS42YS45NzQuOTc0LDAsMCwwLC45NzguOTYzSDI4LjYyN2EuOTc0Ljk3NCwwLDAsMCwuOTc4LS45NjN2' +
                      'LTE1LjZoNC44MTZBMi41OCwyLjU4LDAsMCwwLDM3LDE3Ny45ODRWMTY1LjMzYzAtMTEuNjQ3LTEyLjEyMS0yMC43NDUtMjQuMTA4L' +
                      'TE2Ljk1MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEyNS42NDkpIi8+CiAgPHBhdGggaWQ9Iui3r+W+hF8yMzYiIGRhdGEtbm' +
                      'FtZT0i6Lev5b6EIDIzNiIgY2xhc3M9ImNscy0xIiBkPSJNNzMuOCwxMC43QTEwLjc1LDEwLjc1LDAsMSwwLDYzLjA1OCwyMS40LDE' +
                      'wLjc0NCwxMC43NDQsMCwwLDAsNzMuOCwxMC43Wm0wLDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC41NSkiLz4KPC9zdmc+Cg==',
          symbolSize: [35, 60],
          symbolOffset: [-35, 0],
          label: {
            position: 'bottom',
            padding: [10, 0, 0, 0],
            fontSize: 16,
            color: '#333333',
            formatter: '男'
          },
          data: [{
            type: 'max'
          }],
          silent: true
        }
      },
      {
        name: '女',
        data: [value2],
        type: 'bar',
        stack: '总量',
        barWidth: 25,
        cursor: 'default',
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: '#FFFFFF',
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: '#2563f9' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#57eabf' // 100% 处的颜色
            }], false),
            barBorderRadius: 14
          }

        },
        label: {
          show: true,
          padding: [0, 0, 50, 0],
          fontSize: 20,
          color: '#333333',
          formatter ($data) {
            return Math.abs($data.data).toFixed(2) + '%'
          }
        },
        markPoint: {
          symbol: 'image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5' +
                      'rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzcuOTYgNjkuNSI+CiAgPGRlZnM+CiAgICA8c3R5' +
                      'bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogdXJsKCNsaW5lYXItZ3JhZGllbnQpOwogICAgICB9CiAgICA8L3N0eWxlP' +
                      'gogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSIwLjUiIHgyPSIwLjUiIHkyPSIxIiBncmFkaWVudF' +
                      'VuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAzZWJiNyIvPgogICA' +
                      'gICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMGEzN2YiIHN0b3Atb3BhY2l0eT0iMC42OTQiLz4KICAgIDwvbGluZWFy' +
                      'R3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIGlkPSLnu4RfMjkwOSIgZGF0YS1uYW1lPSLnu4QgMjkwOSIgdHJhbnNmb3JtPSJ0cmFuc' +
                      '2xhdGUoMC4wNjIpIj4KICAgIDxwYXRoIGlkPSLot6/lvoRfMjM3IiBkYXRhLW5hbWU9Iui3r+W+hCAyMzciIGNsYXNzPSJjbHMtMS' +
                      'IgZD0iTTc5LjQzNiwxMC40NjdBMTAuNTE4LDEwLjUxOCwwLDEsMCw2OC45MjUsMjAuOTM0LDEwLjUxMiwxMC41MTIsMCwwLDAsNzk' +
                      'uNDM2LDEwLjQ2N1ptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkuOTg2KSIvPgogICAgPHBhdGggaWQ9Iui3r+W+hF8yMzgi' +
                      'IGRhdGEtbmFtZT0i6Lev5b6EIDIzOCIgY2xhc3M9ImNscy0xIiBkPSJNMzcuNzg1LDE3Ni4wODNsLTUuNzU1LTIyLjVhMTMuNDE5L' +
                      'DEzLjQxOSwwLDAsMC0yNi4xODItLjIxN2wtNS44LDIyLjdhMy44MjUsMy44MjUsMCwwLDAsLjY2NywzLjIxOCwzLjc1OCwzLjc1OC' +
                      'wwLDAsMCwyLjkyOCwxLjQ3OXMyLjgyNy4wNTgsNS4wNi4wNzJjLjcyNSwyLjE0NiwxLjc4Myw1LjI5MiwyLjc1NCw4LjM1QTMuNzI' +
                      'xLDMuNzIxLDAsMCwwLDE1LDE5MS43NjloNy44NThhMy42NzcsMy42NzcsMCwwLDAsMy41MDgtMi41NTJjLjk3MS0zLjA1OSwyLjA1' +
                      'OS02LjMwNiwyLjc2OS04LjQ1MiwyLjIzMy0uMDE1LDUuMDYtLjAyOSw1LjA2LS4wMjlhMy43NjYsMy43NjYsMCwwLDAsMi45MjgtM' +
                      'S40NjQsMy42ODUsMy42ODUsMCwwLDAsLjY2Ny0zLjE4OVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xMjIuMjY5KSIvPg' +
                      'ogIDwvZz4KPC9zdmc+Cg==',
          symbolSize: [35, 60],
          symbolOffset: [35, 0],
          label: {
            position: 'bottom',
            padding: [10, 0, 0, 0],
            fontSize: 16,
            color: '#333333',
            formatter: '女'
          },
          data: [{
            type: 'max'
          }],
          silent: true
        }
      }
    ]
  }
  return options
}
export default {
  name: 'YiGenderRatio',
  mixins: [Core],
  data () {
    this.chartHandler = genderRatio
    return {}
  }
}
