<template>
    <div class="yi-form">
        <el-form ref="form" role="form"
                 v-bind="options"
                 :model="form"
                 :rules="rules"
                 label-width="100px"
                 @submit.native.prevent>
            <el-row v-bind="options">
                <template v-for="(value,key) in template">
                    <el-col v-if="template[key] ? (template[key].component ? handleAttribute(template[key].component.show,true) : true) : false"
                            :span="template[key].component ? handleAttribute(template[key].component.span,(options ? (options.inline ? null : 24) : 24 )) : (options ? (options.inline ? null : 24) : 24 )"
                            :offset="template[key].component ? handleAttribute(template[key].component.offset, 0) : 0">
                        <el-form-item :label="`${template[key].title}：`"
                                      :prop="key">
                            <slot :name="key" v-bind="form">
                                <!--输入框-->
                                <el-input
                                        v-if="(!template[key].component) ||((!template[key].component.name) && (!template[key].component.render)) || template[key].component.name === 'el-input'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-input>
                                <!--数字输入框-->
                                <el-input-number
                                        v-else-if="template[key].component.name === 'el-input-number'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key,data: form})">
                                </el-input-number>
                                <!--单选按钮-->
                                <el-radio-group
                                        v-else-if="template[key].component.name === 'el-radio'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                    <template v-if="template[key].component.buttonMode">
                                        <el-radio-button
                                                v-for="option in template[key].component.options"
                                                :key="option.value"
                                                :label="option.value">
                                            {{option.label}}
                                        </el-radio-button>
                                    </template>
                                    <template v-else>
                                        <el-radio
                                                v-for="option in template[key].component.options"
                                                :key="option.value"
                                                :label="option.value">
                                            {{option.label}}
                                        </el-radio>
                                    </template>
                                </el-radio-group>
                                <el-checkbox-group
                                        v-else-if="template[key].component.name === 'el-checkbox'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                    <template v-if="template[key].component.buttonMode">
                                        <el-checkbox-button
                                                v-for="option in template[key].component.options"
                                                :key="option.value"
                                                :label="option.value"
                                        >
                                            {{option.label}}
                                        </el-checkbox-button>
                                    </template>
                                    <template v-else>
                                        <el-checkbox
                                                v-for="option in template[key].component.options"
                                                :key="option.value"
                                                :label="option.value">
                                            {{option.label}}
                                        </el-checkbox>
                                    </template>
                                </el-checkbox-group>
                                <el-select
                                        v-else-if="template[key].component.name === 'el-select'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                    <el-option
                                            v-for="option in template[key].component.options"
                                            :key="option.value"
                                            v-bind="option"
                                    >
                                    </el-option>
                                </el-select>
                                <el-cascader
                                        v-else-if="template[key].component.name === 'el-cascader'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-cascader>
                                <el-switch
                                        v-else-if="template[key].component.name === 'el-switch'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-switch>
                                <el-slider
                                        v-else-if="template[key].component.name === 'el-slider'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-slider>
                                <el-time-select
                                        v-else-if="template[key].component.name === 'el-time-select'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-time-select>
                                <el-time-picker
                                        v-else-if="template[key].component.name === 'el-time-picker'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-time-picker>
                                <el-date-picker
                                        v-else-if="template[key].component.name === 'el-date-picker'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-date-picker>
                                <el-rate
                                        v-else-if="template[key].component.name === 'el-rate'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-rate>
                                <el-color-picker
                                        v-else-if="template[key].component.name === 'el-color-picker'"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :disabled="handleAttributeDisabled(template[key].disabled,form)"
                                        @change="$emit('change',{key: key, data: form})">
                                </el-color-picker>
                                <render-custom-component
                                        v-else-if="template[key].component.name"
                                        v-model="form[key]"
                                        v-bind="template[key].component"
                                        :component-name="template[key].component.name"
                                        :props="template[key].component.props ? template[key].component.props : null"
                                        @change="$emit('change',{key: key, data: form})">
                                </render-custom-component>
                            </slot>
                        </el-form-item>
                    </el-col>
                </template>
                <el-col :span="options ? (options.inline ? null : 24) : 24" :offset="0">
                    <el-form-item>
                        <el-button v-if="options ? handleAttribute(options.saveButton, true) : true"
                                   :style="{backgroundColor : options ? handleAttribute(options.saveButtonColor, null) : null ,'border-color' : options ? handleAttribute(options.saveButtonColor, null) : null  }"
                                   :size="options ? handleAttribute(options.saveButtonSize, null) : null"
                                   :type="options ? handleAttribute(options.saveButtonType, 'primary') : 'primary'"
                                   :icon="options ? handleAttribute(options.saveButtonIcon, null) : null"
                                   :loading="saveLoading"
                                   @click="handleFormSave"
                                   native-type="submit"
                        >{{options ? handleAttribute(options.saveButtonText, '确定') : '确定'}}
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    import Tool from '../../mixins/tool'
    import renderCustomComponent from '../table/renderCustomComponent.vue'
    export default {
        name: "YiForm",
        mixins:[Tool],
        components: {
            renderCustomComponent
        },
        props:{
            options: {
                type: Object,
                default: null
            },
            data: {
                type: Object,
                default: null
            },
            template: {
                type: Object,
                default: null,
                required: true
            },
            rules: {
                type: Object,
                default: null
            }
        },
        data(){
            return{
                saveLoading: false,
                form:{}
            }
        },
        watch:{
            data: {
                deep: true,
                handler (v) { if (v) { this.changeFormData() } }
            },
        },
        methods:{
            changeFormData(){
                if(this.data && JSON.stringify(this.data) !=='{}'){
                    this.form = Object.assign(this.initFormData(),this.data)
                }else {
                    this.form = this.initFormData()
                }
            },
            initFormData(){
                let data={}
                if(this.template){
                    for(let prop in this.template){
                        data[prop]=this.template[prop].value !==undefined ? this.template[prop].value : ''
                    }
                }
                return data
            },
            /**
             * @description 保存行数据
             */
            handleFormSave () {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    this.saveLoading = true
                    let data={}
                    for (let prop in this.form) {
                        data[prop] = this.form[prop]
                    }
                    this.$emit('form-submit', data, () => {
                        this.saveLoading = false
                    })
                })
            }
        },
        mounted() {
            this.changeFormData()
        }
    }
</script>

<style scoped>

</style>
