<template>
    <el-tabs tab-position="left">
        <el-tab-pane label="带边框">
            <yi-form-show
                    border
                    labelWidth="120px"
                    :template="template"
                    :data="formData"
                    :span="6">
            </yi-form-show>
            <yi-form-show
                     style="margin-top: 40px;"
                    border
                    labelWidth="120px"
                    labelColor="#ccdc"
                    borColor="#409EFF"
                    :template="template"
                    :data="formData"
                    :span="6">
            </yi-form-show>
        </el-tab-pane>
        <el-tab-pane label="基础">
            <yi-form-show
                    :template="template"
                    :data="formData"
                    :span="6"></yi-form-show>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "show",
        data(){
            return{
                template:{
                    code: { title: '编码',component:{name:'el-tag'}},
                    name: { title: '数据项名',component:{name:'el-link'}},
                    time: { title: '校内职务名称',dataType:'time',format:'yyyy-MM-dd',component:{name:'el-button',emit:()=>{
                            console.log("aaaaa")
                            }}},
                    short_name: { title: '中文简称'},
                    constraint: { title: '必备数据'},
                    example: { title: '解释/举例',span:18},
                },
                formData:{
                    code: "",
                    name: "信息化建设与管理办公室主任",
                    short_name: "办公室主任",
                    constraint: 0,
                    example: "信息化建设与管理办公室主任",
                    time:'2020-03-26T16:10:17+08:00'
                },
            }
        }
    }
</script>

<style scoped>

</style>
