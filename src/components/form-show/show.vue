<template>
    <div class="yi-form-show" :class="{'yi-form-border': border}">
        <el-form :label-width="labelWidth"
                 :label-position="labelPosition"
                 @submit.native.prevent>
           <el-row>
               <template v-for="(value,key) in template">
                   <el-col v-if="template[key] ? handleAttribute(template[key].show,true) : false"
                           :span="template[key] ? handleAttribute(template[key].span,span) : span">
                       <el-form-item :label="`${template[key].title}：`"
                                     :prop="key">
                           <slot :name="key" v-bind="data">
                               <el-tag v-if="template[key].component && template[key].component.name && template[key].component.name === 'el-tag'"
                                       v-bind="template[key].component">
                                   {{data[key]}}
                               </el-tag>
                               <el-button v-else-if="template[key].component && template[key].component.name && template[key].component.name === 'el-button'"
                                       v-bind="template[key].component" @click="handleClick(key,data)">
                                   {{data[key]}}
                               </el-button>
                               <el-link v-else-if="template[key].component && template[key].component.name && template[key].component.name === 'el-link'"
                                          v-bind="template[key].component">
                                   {{data[key]}}
                               </el-link>
                               <render-custom-component
                                       v-else-if="template[key].component && template[key].component.name && template[key].component.name !==''"
                                       v-bind="template[key].component"
                                       :component-name="template[key].component.name"
                                       :props="template[key].component.props ? template[key].component.props : null"
                                       :scope="data">
                               </render-custom-component>
                               <label class="el-form-item__label" v-else>
                                   {{data ? (template[key].formatter ? template[key].formatter(data[key]) : data[key]) : ''}}
                               </label>
                           </slot>
                       </el-form-item>
                   </el-col>
               </template>
           </el-row>
        </el-form>
    </div>
</template>

<script>
    import Tool from '../../mixins/tool'
    import renderCustomComponent from '../table/renderCustomComponent.vue'
    export default {
        name: "YiFormShow",
        mixins:[Tool],
        components:{renderCustomComponent},
        props:{
            border:Boolean,
            labelWidth:{
                type:String,
                default:'100px'
            },
            //right/left/top
            labelPosition:{
                type:String,
                default:'left'
            },
            span: {
                type:Number,
                default:24,
            },
            data: {
                type: Object,
                required: true
            },
            /**
                title:'',
                show:true,
                span:24,
                formatter:Function
                component:{
                    name:'',
                }
             * 支持自定义组件 el-tag el-button el-link
             */
            template: {
                type: Object,
                required: true
            },
        },
        methods:{
            handleClick(key,data){
                if(this.template[key].component.emit){
                    this.$emit(this.template[key].component.emit,key,data)
                }
            }
        }
    }
</script>

<style scoped>

</style>
