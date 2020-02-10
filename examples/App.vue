<template>
    <div id="app">
        <el-tabs>
            <el-tab-pane label="信息显示">
                <h1>例子一</h1>
                <yi-form-show
                        :template="template1"
                        :data="formData">
                </yi-form-show>
                <h1>例子二</h1>
                <yi-form-show
                        :template="template1"
                        :data="formData"
                        :span="8"></yi-form-show>
                <h1>例子三:带边框</h1>
                <yi-form-show
                        border
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
            <el-tab-pane label="列表">
                <h1>例子一</h1>
                <yi-table
                        :columns="column2"
                        :data="data"
                        :pagination="pagination"
                        @query-changes="handleQueryChange"/>
                <h1>例子二：表格加载</h1>
                <yi-table
                        :columns="column2"
                        :data="data"
                        :loading="loading"/>
                <h2>例子三</h2>
                <yi-table :columns="column"
                          :data="data"
                          :options="{stripe:true}"
                          selection
                          :rowHandle="rowHandle">
                    <template slot="name" slot-scope="scope">
                        <el-tag>{{scope.name}}</el-tag>
                    </template>
                    <template slot="header">
                        <el-button>指导研究生情况</el-button>
                    </template>
                    <template slot="foot">
                        <span>数据采集时间：2019-12-13 00:00:00</span>
                    </template>
                </yi-table>
            </el-tab-pane>
            <el-tab-pane label="动态数字">
                <yi-count-to :end="1234" :startVal="10" usegroup></yi-count-to>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import test from './test'
    export default {
        name: "app",
        components:{test},
        data(){
            return{
                pagination:{
                    total: 4,
                    pageSize: 10,
                    currentPage: 1
                },
                loading: true,
                column:[
                    { title: '专业名称', key: 'name',fixed:true ,query:true,component:{name:'el-input'}},
                    { title: '专业代码', key: 'code',query:true,component:{name:'el-select',options:[
                                {label:'选项一',value:'选项一'}
                            ]}},
                    { title: '专业简称', key: 'short_name',query:true,component:{name:'el-input'} },
                    { title: '所属机构', key: 'affiliate'},
                    { title: '学制', key: 'education' },
                    { title: '层次', key: 'level'},
                    { title: '学科门类', key: 'category',},
                ],
                column2:[
                    { title: '专业名称', key: 'name',fixed:true },
                    { title: '专业代码', key: 'code',},
                    { title: '专业简称', key: 'short_name',},
                    { title: '所属机构', key: 'affiliate'},
                    { title: '学制', key: 'education' },
                    { title: '层次', key: 'level'},
                    { title: '学科门类', key: 'category',},
                ],
                data:[
                    {name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'},
                    {name:'法律质询',code:'fz001',short_name:'法律质询',affiliate:'法律学院',education:'4年',level:'本科',category:'法学'}
                ],
                rowHandle:{
                    operate:[
                        {text:'上传',emit:''}
                    ]
                },
                template:{
                    code: { title: '编码', component: { placeholder: '大写字母和数据,如：TJBB0101' } },
                    name: { title: '数据项名', component: { placeholder: '大写字母,如：XH' } },
                    short_name: { title: '中文简称' },
                    constraint: { title: '必备数据', value: 0, component: { name: 'el-radio', options: [{ value: 1, label: '是' }, { value: 0, label: '否' }] } },
                    example: { title: '解释/举例', component: { name: 'el-input', type: 'textarea', rows: 5 } }
                },
                template1:{
                    code: { title: '编码',component:{name:'el-button',emit:'handleClick'}},
                    name: { title: '数据项名',component:{name:test,value:'2324'}},
                    short_name: { title: '中文简称' ,component:{name:'el-tag',type:"success"}},
                    constraint: { title: '必备数据',component:{name:'el-link',type:"primary"}},
                    example: { title: '解释/举例'}
                },
                formData:{
                    code: "asdf",
                    name: "asdf",
                    short_name: "asfdasdf",
                    constraint: 0,
                    example: "asf"
                },
                rules:{

                }
            }
        },methods:{
            handleFormSubmit(data,done){
                console.log(data)
                done()
            },
            handleClick(){
                console.log("click")
            },
            handleQueryChange(data){
                console.log(data)
            }
        }
    }
</script>

<style scoped>

</style>
<style lang="scss">
    @import "../src/styles/index.scss";
</style>
