<template>
    <el-tabs tab-position="left">
        <el-tab-pane label="基础">
            <yi-form-show
                    :template="template"
                    :data="formData"
                    :span="6"></yi-form-show>
        </el-tab-pane>
        <el-tab-pane label="带边框">
            <yi-form-show
                    border
                    labelWidth="120px"
                    :template="template"
                    :data="formData"
                    :span="12">
            </yi-form-show>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "show",
        data(){
            return{
                template:{
                    code: { title: '编码',component:{name:'el-button',emit:'handleClick'}},
                    name: { title: '数据项名'},
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
            }
        }
    }
</script>

<style scoped>

</style>
