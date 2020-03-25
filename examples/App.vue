<template>
    <div id="app">
        <el-tabs>
            <el-tab-pane label="图表">
                <d-echart></d-echart>
            </el-tab-pane>
            <el-tab-pane label="列表">
                <d-table></d-table>
            </el-tab-pane>
            <el-tab-pane label="信息显示">
                <d-show></d-show>
            </el-tab-pane>
            <el-tab-pane label="表单">
                <d-from></d-from>
            </el-tab-pane>
            <el-tab-pane label="其他">
                <d-other></d-other>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import dEchart from './pages/echart'
    import dTable from './pages/table'
    import dShow from './pages/show'
    import dFrom from './pages/from'
    import dOther from './pages/other'

    export default {
        name: "app",
        components:{dEchart,dTable, dShow,dFrom,dOther},
        data(){
           return{

           }
        },
        methods:{

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
