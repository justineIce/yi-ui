<template>
    <div id="app">
        <el-tabs>
            <el-tab-pane label="列表">
                <div style="padding: 20px;">
                    <p> 搜索栏优化：</p>
                    <p>1、文字宽度可以自定义
                        <span style="color: red;"> labelWidth="80px"</span>
                    </p>
                    <p>2、输入框或下拉框等宽度可以自定义
                    <p><span>设置“columns”中</span></p>
                    <span>component:{name:'el-input',<span style="color: red;">span:4</span>}
                           或component:{name:'el-input',<span style="color: red;">width:'150px'</span>}</span>
                    </p>
                    <p>3、默认显示一排搜索条件（也可以设置显示所有搜索条件），加入更多方式进行展开收起
                        <span style="color: red;"> :expandAll="true"</span>
                    </p>
                </div>
                <yi-table ref="table"
                          :columns="column"
                          :data="data"
                          :expandAll="true"
                          labelWidth="80px"
                          :options="{stripe:true}"
                          :pagination="pagination"
                          selection
                          :rowHandle="rowHandle"
                          @query-changes="handleQueryChange">
                    <template slot="operate">
                        <el-button>自定义按钮</el-button>
                    </template>
                    <template slot="header">
                        <el-button>自定义header</el-button>
                    </template>
                    <template slot="foot">
                        <span>自定义foot</span>
                    </template>
                    <template slot="name" slot-scope="scope">
                        <el-tag>{{scope.name}}</el-tag>
                    </template>
                </yi-table>
                <h1>树形数据与懒加载</h1>
                <yi-table :columns="tableColumn"
                          :data="tableData"
                          :expandAll="false"
                          :options="{
                          defaultExpandAll:true,
                          treeProps:{children: 'children',hasChildren: 'hasChildren'},
                          rowKey:'id'
                        }"/>
                <yi-table :columns="tableColumn" :data="tableData1"
                          :options="{
                              treeProps:{children: 'children',hasChildren: 'hasChildren'},
                              rowKey:'id',
                              lazy:true,
                              load:load
                        }">
                </yi-table>
            </el-tab-pane>
            <el-tab-pane label="图表">
                <yi-line height="300px" :data="{
                     dimensions:['name','value:人数'],
                     source:[{name:'男',value:'123'},{name:'女',value:'234'}]
                }"></yi-line>
            </el-tab-pane>
            <el-tab-pane label="信息显示">
                <h1>例子一</h1>
                <yi-form-show
                        :template="template1"
                        :data="formData"
                        :span="6">
                </yi-form-show>
                <h1>例子二:带边框</h1>
                <yi-form-show
                        border
                        labelWidth="120px"
                        :template="template1"
                        :data="formData"
                        :span="12">
                </yi-form-show>
            </el-tab-pane>
            <el-tab-pane label="表单">
                <h1>例子一</h1>
                <yi-form :template="template"
                         :data="formData"
                         :rules="rules"
                         @form-submit="handleFormSubmit">
                </yi-form>
            </el-tab-pane>
            <el-tab-pane label="card">
                <yi-card title="card demo" style="width: 300px">
                    <p>主体内容更部分454</p>
                </yi-card>
            </el-tab-pane>
            <el-tab-pane label="动态数字">
                <yi-count-to :end="1234" :startVal="10" usegroup></yi-count-to>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import test from './test'
    import YiLine from "../src/components/echarts/packages/line";
    export default {
        name: "app",
        components:{YiLine, test},
        data(){
            return{
                /**表格**/
                tableColumn:[
                    { title: '时间', key: 'date'},
                    { title: '名称', key: 'name'},
                    { title: '地址', key: 'address'},
                ],
                tableData: [
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
                tableData1:[
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
                column:[
                    {title:'图片',key:'img',component:{name:'el-image'}},
                    { title: '专业名称', key: 'name',fixed:true ,value:'法律专业',query:true,component:{name:'el-input'}},
                    { title: '专业代码', key: 'code',query:true,component:{name:'el-select',options:[{label:'选项一',value:'选项一'}]}},
                    { title: '专业简称', key: 'short_name',query:true,component:{name:'el-input',width:'150px'} },
                    { title: '所属机构', key: 'affiliate',query:true,component:{name:'el-input'}},
                    { title: '学制', key: 'education' ,query:true,component:{name:'el-input'}},
                    { title: '层次', key: 'level',query:true,component:{name:'el-input'}},
                    { title: '学科门类', key: 'category',query:true},
                    { title: '时间', key: 'time',query:true,dataType:'time',component:{name:'el-date-picker',valueFormat:'yyyy-MM-dd'}},
                ],
                data:[
                    {time:'2020-03-11T09:27:44+08:00',img:'http://attach.bbs.miui.com/forum/201505/26/165830wjhnbgkouuyyybyv.jpg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {time:'2020-03-11T09:27:44+08:00',img:'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {time:'2020-03-11T09:27:44+08:00',img:'http://attach.bbs.miui.com/forum/201505/26/165830wjhnbgkouuyyybyv.jpg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {time:'2020-03-11T09:27:44+08:00',img:'http://attach.bbs.miui.com/forum/201505/26/165830wjhnbgkouuyyybyv.jpg',name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'}
                ],
                rowHandle:{
                    operate:[
                        {text:'上传',emit:''}
                    ]
                },
                /**表单**/
                template:{
                    code: { title: '编码', component: { placeholder: '大写字母和数据,如：TJBB0101' } },
                    name: { title: '数据项名', component: { placeholder: '大写字母,如：XH' } },
                    short_name: { title: '中文简称' },
                    constraint: { title: '必备数据', value: 0, component: { name: 'el-radio', options: [{ value: 1, label: '是' }, { value: 0, label: '否' }] } },
                    example: { title: '解释/举例', component: { name: 'el-input', type: 'textarea', rows: 5 } }
                },
                /**信息显示**/
                template1:{
                    code: { title: '编码',component:{name:'el-button',emit:'handleClick'}},
                    name: { title: '数据项名',component:{name:test,value:'2324'}},
                    mc: { title: '校内职务名称'},
                    short_name: { title: '中文简称' ,component:{name:'el-tag',type:"success"}},
                    constraint: { title: '必备数据',component:{name:'el-link',type:"primary"}},
                    example: { title: '解释/举例'},
                },
                formData:{
                    code: "asdf",
                    name: "asdf",
                    short_name: "asfdasdf",
                    constraint: 0,
                    example: "asf",
                    mc:'信息化建设与管理办公室主任'
                },
                rules:{

                }
            }
        },
        methods:{
            handleFormSubmit(data,done){
                console.log(data)
                done()
            },
            handleClick(){
                console.log("click")
            },
            handleQueryChange(data){
                console.log("click")
                console.log(data)
            },
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
            }
        },
        mounted() {
            this.$nextTick(()=>{
                //设置查询条件
                this.$refs.table.setQueryCriteria({
                    name:'法律专业',
                    code:'选项一',
                    level:'高级'
                })
                //得到查询条件
              var data=  this.$refs.table.getQueryCriteria()
                console.log(data)
            })
        }
    }
</script>

<style scoped>

</style>
<style lang="scss">
    @import "../src/styles/index.scss";
</style>
