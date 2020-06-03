<template>
    <el-tabs tab-position="left">
        <el-tab-pane label="基础表格">
            <p>设置查询条件:setQueryCriteria({name:'法律专业', code:'选项一', level:'高级'})</p>
            <p>得到查询条件:getQueryCriteria()</p>
            <yi-table ref="table"
                      :columns="column"
                      :data="data"
                      expand-all
                      :options="{stripe:true}"
                      :pagination="pagination"
                      selection
                      :rowHandle="rowHandle"
                      @query-changes="handleQueryChange">
                <template slot="operate">
                <el-button size="small">自定义按钮</el-button>
                </template>
                <template slot="header">
                    <el-button size="small">自定义header</el-button>
                </template>
                <template slot="foot">
                    <span>自定义foot</span>
                </template>
                <template slot="name" slot-scope="scope">
                    <el-tag>{{scope.name}}</el-tag>
                </template>
            </yi-table>
            <yi-table ref="table"
                      :columns="column"
                      :data="data"
                      :expand-all="true"
                      :options="{stripe:true}"
                      :pagination="pagination"
                      selection
                      :rowHandle="rowHandle"
                      @query-changes="handleQueryChange"/>
        </el-tab-pane>
        <el-tab-pane label="树形数据与懒加载">
            <yi-table ref="table1" :columns="tColumn"
                      :data="tData"
                      expand-all
                      :options="{
                          defaultExpandAll:true,
                          treeProps:{children: 'children',hasChildren: 'hasChildren'},
                          rowKey:'id'
                        }"></yi-table>
            <yi-table :columns="tColumn"
                      :data="tData1"
                      :options="{
                              treeProps:{children: 'children',hasChildren: 'hasChildren'},
                              rowKey:'id',
                              lazy:true,
                              load:load
                        }">
            </yi-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "dtable",
        data(){
            return{
                tColumn:[
                    { title: '时间', key: 'date'},
                    { title: '名称', key: 'name'},
                    { title: '地址', key: 'address'},
                ],
                tData: [
                    {
                        id: 1,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        id: 2,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        id: 3,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        children: [{
                            id: 31,
                            date: '2016-05-01',
                            name: '小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }]
                    }, {
                        id: 4,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
                tData1:[
                    {
                        id: 3,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        hasChildren: true
                    }
                ],
                pagination:{
                    total: 4,
                    pageSize: 10,
                    currentPage: 1
                },
                rowHandle:{
                    operate:[
                        {text:'上传',emit:''}
                    ]
                },
                column:[
                    {title:'图片',key:'img',show:false,component:{name:'el-image'}},
                    { title: '专业名称', key: 'name',show:true,fixed:true ,value:'法律专业',query:true,component:{name:'el-input'}},
                    { title: '代码', key: 'code',query:true,onlyQuery: true,component:{name:'el-select',options:[{label:'选项一',value:'选项一'}]}},
                    { title: '简称', key: 'short_name',query:true,component:{name:'el-input',width:'150px'} },
                    { title: '所属机构', key: 'affiliate',query:true,component:{name:'el-select',options:[]}},
                    { title: '学制', key: 'education' ,query:true,component:{name:'el-input'}},
                    { title: '层次', key: 'level',query:true,component:{name:'el-input'}},
                    {
                        title: '学科门类', key: 'category', query: true, component: {
                            name: 'el-cascader',
                            props:{value:'id'},
                            options: [
                                {
                                    id: 'zhinan',
                                    label: '指南',
                                    children: [{
                                        id: 'shejiyuanze',
                                        label: '设计原则',
                                        children: [{
                                            id: 'yizhi',
                                            label: '一致'
                                        }, {
                                            id: 'fankui',
                                            label: '反馈'
                                        }, {
                                            id: 'xiaolv',
                                            label: '效率'
                                        }, {
                                            id: 'kekong',
                                            label: '可控'
                                        }]
                                    }]
                                }
                            ]
                        }
                    },
                    { title: '时间', key: 'time',query:true,dataType:'time',format:'yyyy-MM-dd',component:{name:'el-date-picker',valueFormat:'yyyy-MM-dd'}},
                ],
                data:[
                    {time:'2020-03-11T09:27:44+08:00',img:'http://attach.bbs.miui.com/forum/201505/26/165830wjhnbgkouuyyybyv.jpg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {time:'2020-03-11T09:27:44+08:00',img:'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {time:'2020-03-11T09:27:44+08:00',img:'http://attach.bbs.miui.com/forum/201505/26/165830wjhnbgkouuyyybyv.jpg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {time:'2020-03-11T09:27:44+08:00',img:'http://attach.bbs.miui.com/forum/201505/26/165830wjhnbgkouuyyybyv.jpg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'}
                ],
            }
        },
        methods:{
            load(tree,treeNode,resolve){
                setTimeout(() => {
                    resolve([
                        {
                            id: 31,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ])
                }, 1000)
            },
            handleQueryChange(data){
                console.log(data)
            }
        }
    }
</script>

<style scoped>

</style>
