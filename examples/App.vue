<template>
    <div id="app">
        <el-tabs @tab-click="handleChange">
            <el-tab-pane label="信息显示" lazy>
                <d-show></d-show>
            </el-tab-pane>
            <el-tab-pane label="列表" lazy>
                <d-table ref="table"></d-table>
            </el-tab-pane>
            <el-tab-pane label="表单" lazy>
                <d-from></d-from>
            </el-tab-pane>
            <el-tab-pane label="其他" lazy>
                <d-other></d-other>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import dTable from './pages/table'
    import dShow from './pages/show'
    import dFrom from './pages/from'
    import dOther from './pages/other'
    export default {
        name: "app",
        components:{dTable, dShow,dFrom,dOther},
        data(){
           return{

           }
        },
        methods:{
            handleChange(){

            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
<style lang="scss">
    @import "../src/styles/index.scss";
</style>
