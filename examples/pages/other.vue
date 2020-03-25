<template>
    <el-tabs tab-position="left">
        <el-tab-pane label="card">
            <yi-card title="card demo" style="width: 300px">
                <p>主体内容更部分454</p>
            </yi-card>
        </el-tab-pane>
        <el-tab-pane label="动态数字">
            <yi-count-to :end="1234" :startVal="10" usegroup></yi-count-to>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        name: "other"
    }
</script>

<style scoped>

</style>
