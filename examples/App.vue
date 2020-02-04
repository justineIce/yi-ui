<template>
    <div>
        <p>card</p>
        <yi-card title="card demo" style="width: 300px">
            <p>主体内容更部分</p>
        </yi-card>
        <p>列表</p>
        <yi-table :columns="column"
                  :data="data">
        </yi-table>
    </div>
</template>

<script>
    // import YiCard from "../src/components/card/card";
    export default {
        name: "app",
        // components: {YiCard},
        data(){
            return{
                column:[
                    { title: '标准ID', key: 'ID' },
                    { title: '标准名称', key: 'Name'},
                ],
                data:[
                    {ID:234234,Name:"saasdf"}
                ]
            }
        }
    }
</script>

<style scoped>

</style>
<style lang="scss">
    @import "../src/styles/index.scss";
</style>
