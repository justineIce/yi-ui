<template>
    <yi-form :template="template"
             :data="formData"
             :rules="rules"
             @form-submit="handleFormSubmit"></yi-form>
</template>

<script>
    export default {
        name: "from",
        data(){
            return{
                template:{
                    code: { title: '编码', component: { placeholder: '大写字母和数据,如：TJBB0101' } },
                    name: { title: '数据项名', component: { placeholder: '大写字母,如：XH' } },
                    short_name: { title: '中文简称' },
                    constraint: { title: '必备数据', value: 0, component: { name: 'el-radio', options: [{ value: 1, label: '是' }, { value: 0, label: '否' }] } },
                    example: { title: '解释/举例', component: { name: 'el-input', type: 'textarea', rows: 5 } }
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
        },methods:{
            handleFormSubmit(data){
                console.log(data)
            }
        }
    }
</script>

<style scoped>

</style>
