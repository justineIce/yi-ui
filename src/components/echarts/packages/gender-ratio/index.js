import echarts from 'echarts'
import Core from '../../core'

const genderRatio = (source, settings, extra) => {
  if (!(source instanceof Array)) {
    console.log('数据类型错误，应为Array')
    return false
  }
  const data = JSON.parse(JSON.stringify(source))
  let male = -1 * data[0], female = data[1]
  let sum = data[0] + data[1]
    let icons = {
        'male':'data:image/png;base64,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',
        'female':'data:image/png;base64,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'
    };
    let option = {
        // grid:{
        //   left:'10%',
        //   right:'15%'
        // },
        xAxis: [{type: 'value', show: false,max:sum}],
        yAxis: [{type: 'category', show: false, data: ['性别比例']}],
        series: [
            {
            name: '男',
            type: 'bar',
            stack: '性别比例',
            barWidth: 20,
            cursor: 'default',
            label: {
                normal: {
                    show: true,
                    padding: [0, 0, 50, 0],
                    fontWeight:100,
                    color: '#333333',
                    formatter: '{b|'+data[0]+'人}{c|('+(data[0]/sum * 100).toFixed(2)+'%)}',
                    rich: {
                        b:{
                            fontSize: 16,
                            color: '#1296DB',
                            fontWeight:600,
                        },
                        c:{
                            fontSize: 14,
                            color: '#333333',
                        }
                    }
                }
            },
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
                            color: '#1296DB' // 100% 处的颜色
                        }], false),
                        barBorderRadius: 14
                    }
                },
            markPoint:{
                symbol:'image://'+icons.male,
                symbolSize: [40, 40],
                symbolOffset: [-40, 0],
                label: {
                    position: 'bottom',
                    padding: [5, 0, 0, 0],
                    fontSize: 14,
                    color: '#333333',
                    formatter: '男'
                },
                data: [{
                    type: 'max'
                }],
                silent: true
            },
            data: [male]
        },
            {
                name: '女',
                type: 'bar',
                stack: '性别比例',
                barWidth: 20,
                cursor: 'default',
                label: {
                    normal: {
                        show: true,
                        padding: [0, 0, 50, 0],
                        fontWeight:100,
                        color: '#333333',
                        formatter: '{b|'+data[1]+'人}{c|('+(data[1]/sum * 100).toFixed(2)+'%)}',
                        rich: {
                            b:{
                                fontSize: 16,
                                color: '#1296DB',
                                fontWeight:600,
                            },
                            c:{
                                fontSize: 14,
                                color: '#333333',
                            }
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        borderStyle: 'solid',
                        borderColor: '#FFFFFF',
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: '#1296DB' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#57eabf' // 100% 处的颜色
                        }], false),
                        barBorderRadius: 14
                    }
                },
                markPoint:{
                    symbol:'image://'+icons.female,
                    symbolSize: [40, 40],
                    symbolOffset: [40, 0],
                    label: {
                        position: 'bottom',
                        padding: [5, 0, 0, 0],
                        fontSize: 14,
                        color: '#333333',
                        formatter: '女'
                    },
                    data: [{
                        type: 'max'
                    }],
                    silent: true
                },
                data: [female]
            }
        ]
    }
  return option
}
export default {
  name: 'YiGenderRatio',
  mixins: [Core],
  data () {
    this.chartHandler = genderRatio
    return {}
  }
}
