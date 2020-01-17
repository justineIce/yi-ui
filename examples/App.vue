<template>
    <div>
        <p>card</p>
        <yi-card title="card demo" style="width: 300px">
            <p>主体内容更部分</p>
        </yi-card>
    </div>
</template>

<script>
    import YiCard from "../src/components/card/card";
    export default {
        name: "app",
        components: {YiCard}
    }
</script>

<style scoped>

</style>
<style lang="scss">
    @import "../src/styles/index.scss";
</style>
