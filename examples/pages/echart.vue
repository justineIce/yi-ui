<template>
    <!--图标-->
   <el-tabs tab-position="left">
       <el-tab-pane label="折线图">
           <yi-line width="482px"
                    height="300px"
                    style="border:1px solid red"
                    :data="data"
                    :grid="{left:'20%'}"
                    :settings="{label:{rotate:20}}"></yi-line>
           <yi-line width="482px"
                    height="300px"
                    style="border:1px solid red"
                    :data="chartData"></yi-line>
       </el-tab-pane>

       <el-tab-pane label="柱状图">
           <yi-histogram width="482px"
                         height="300px"
                         style="border:1px solid red"
                         :data="chartData"></yi-histogram>
           <yi-histogram width="482px"
                    height="300px"
                    style="border:1px solid red"
                    :data="data"
                    :grid="{left:'20%'}"
                    :settings="{label:{rotate:20}}"></yi-histogram>
       </el-tab-pane>
       <el-tab-pane label="条形图">
           <yi-bar width="482px"
                         height="300px"
                         style="border:1px solid red"
                   :data="chartData"></yi-bar>
       </el-tab-pane>
       <el-tab-pane label="饼图">
           <yi-pie width="482px"
                   height="300px"
                   style="border:1px solid red"
                   :data="chartData"></yi-pie>
       </el-tab-pane>
       <el-tab-pane label=雷达图>
           <yi-radar width="482px"
                   height="300px"
                   style="border:1px solid red"
                     :data="chartData"></yi-radar>
       </el-tab-pane>
       <el-tab-pane label="水球图">
           <yi-liquidfill  width="482px"
                             height="300px"
                             style="border:1px solid red"
                             :data="{
                                  dimensions: ['city', 'percent'],
                                  source: [{
                                    city: '上海',
                                    percent: 0.6
                                  }]}"></yi-liquidfill>
       </el-tab-pane>
       <el-tab-pane label="地图">
           <yi-map  width="482px"
                           height="300px"
                           style="border:1px solid red"
                           :data="mapData"></yi-map>
       </el-tab-pane>
       <el-tab-pane label="词云图">
           <yi-word-cloud  width="482px"
                    height="300px"
                    style="border:1px solid red"
                    :data="wordData"></yi-word-cloud>
       </el-tab-pane>
       <el-tab-pane label="男女比例图">
           <yi-gender-ratio  width="482px"
                             height="150px"
                             style="border:1px solid red"
                             :data="[20,50]"></yi-gender-ratio>
       </el-tab-pane>
       <el-tab-pane label="排名">
           <yi-ranking  width="482px"
                        height="300px"
                        style="border:1px solid red"
                        :data="rankingData"></yi-ranking>
           <yi-ranking-icon  width="482px"
                             height="300px"
                             style="border:1px solid red"
                             :data="rankingData"></yi-ranking-icon>
       </el-tab-pane>
   </el-tabs>
</template>

<script>

    export default {
        name: "echart",
        components: {},
        data(){
            return{
                data:{
                    dimensions:['name','value'],
                    source:[
                        {name:'经济法学院（生态法学院）',value:12},
                        {name:'商学院（监察审计学院）',value:234},
                        {name:'政治与公共管理学院',value:234},
                        {name:'经济学院',value:234},
                        {name:'商学院（监察审计学院）',value:234}
                    ]
                },
                chartData: {
                    dimensions: ['日期', '访问用户', '下单用户', '下单率'],
                    source: [
                        { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                        { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                        { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                        { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                        { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                        { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                    ]
                },
                mapData: [
                    { name: '北京', value: 10 },
                    { name: '天津', value: 20 },
                    { name: '河北', value: 30 },
                    { name: '山西', value: 40 },
                    { name: '内蒙古', value: 50 },
                    { name: '辽宁', value: 60 },
                ],
                wordData: {
                        dimensions: ['word', 'count'],
                        source:  [{
                            'word': 'visualMap',
                            'count': 22199
                        }, {
                            'word': 'continuous',
                            'count': 10288
                        }, {
                            'word': 'contoller',
                            'count': 620
                        }, {
                            'word': 'series',
                            'count': 274470
                        }, {
                            'word': 'gauge',
                            'count': 12311
                        }]
                    },
                rankingData: [
                    { name: '北京', value: 10 },
                    { name: '天津', value: 20 },
                    { name: '河北', value: 30 },
                    { name: '山西', value: 40 },
                    { name: '内蒙古', value: 50 },
                    { name: '辽宁', value: 60 },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
