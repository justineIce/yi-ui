<template>
    <div class="yi-card">
        <div class="yi-card__header" v-if="title || $slots.header">
            <span class="title">{{title}}</span>
            <slot name="header"></slot>
        </div>
        <div class="yi-card__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "YiCard",
        props:{
            title:{
                type:String,
                default:''
            }
        }
    }
</script>

<style scoped>

</style>
