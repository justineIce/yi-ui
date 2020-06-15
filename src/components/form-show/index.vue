<template>
    <div class="yi-form-show"
         :class="{'yi-form-border': border}">
        <table class="yi-form-show__table"
               cellpadding="0"
               cellspacing="0"
               :style="{
                    border:border ? `1px solid ${borColor}` : 'unset',
               }">
            <tbody>
                <template v-for="(value,key) in template">
                    <tr class="yi-form-show__tr"
                        :key="`${key}`"
                        :style="{
                        width:`${100/(template[key] ? handleAttribute(24/template[key].span,24/span) : 24/span)}%`,
                        borderBottom:border ? `1px solid ${borColor}` : 'unset'
                    }">
                        <td class="yi-form-show__title"
                            :width="labelWidth"
                            :style="{
                                textAlign:labelPosition,
                                backgroundColor:border ? labelColor:'transparent'
                            }">{{template[key].title}}：</td>
                        <td class="yi-form-show__content"
                            :style="{
                                borderLeft:border ? `1px solid ${borColor}` : 'unset',
                                borderRight:border ? `1px solid ${borColor}` : 'unset'
                            }">
                            <slot :name="key" v-bind="data">
                                <el-tag v-if="template[key].component && template[key].component.name && template[key].component.name === 'el-tag'"
                                        v-bind="template[key].component">
                                    {{template[key].dataType && template[key].dataType === 'time' ? formatDate( data[key],template[key].format) : data[key]}}
                                </el-tag>
                                <el-button v-else-if="template[key].component && template[key].component.name && template[key].component.name === 'el-button'"
                                           v-bind="template[key].component" @click="handleClick(key,data)">
                                    {{template[key].dataType && template[key].dataType === 'time' ? formatDate( data[key],template[key].format) : data[key]}}
                                </el-button>
                                <el-link v-else-if="template[key].component && template[key].component.name && template[key].component.name === 'el-link'"
                                         v-bind="template[key].component">
                                    {{template[key].dataType && template[key].dataType === 'time' ? formatDate( data[key],template[key].format) : data[key]}}
                                </el-link>
                                <render-custom-component
                                        v-else-if="template[key].component && template[key].component.name && template[key].component.name !==''"
                                        v-bind="template[key].component"
                                        :component-name="template[key].component.name"
                                        :props="template[key].component.props ? template[key].component.props : null"
                                        :scope="data">
                                </render-custom-component>
                                <label  v-else>
                                    {{data ? (template[key].formatter ? template[key].formatter(data[key],template[key].format) : (template[key].dataType && template[key].dataType === 'time' ? formatDate( data[key],template[key].format) : data[key])) : ''}}
                                </label>
                            </slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
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
                default:''
            },
            labelColor:{
                type:String,
                default:'#fbfafa'
            },
            borColor:{
                type:String,
                default:'#f2eeee'
            },
            //right/left/top
            labelPosition:{
                type:String,
                default:'right'
            },
            span: {
                type:Number,
                default:24,
            },
            data: {
                type: Object,
                required: true
            },
            template: {
                type: Object,
                required: true
            },
        },
        methods:{
            handleClick(key,data){
                let emit=this.template[key].component.emit
                if(emit && typeof emit === 'function'  ){
                    this.template[key].component.emit(key,data)
                }
            }
        }
    }
</script>

<style scoped>

</style>
