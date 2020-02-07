<template>
    <div>
        <el-button>{{scope.name}}--自定义组件</el-button>
    </div>
</template>

<script>
    export default {
        name: "test",
        props:{
            scope: Object,
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
