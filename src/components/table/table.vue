<template>
    <div class="yi-table"
         v-loading="loading">
        <div class="yi-table__query" ref="query" v-if="queryModel && queryModel.length>0">
            <div class="yi-table__wrap">
                <!--搜索内容-->
                <div class="wrap-content">
                    <div class="wrap-from">
                        <el-form ref="form"
                                 style="display: flex;width: 100%;"
                                 :label-width="labelWidth"
                                 :inline="true"
                                 :model="queryData"
                                 @submit.native.prevent>
                            <el-row ref="fbody" style="overflow: hidden;position: relative;"
                                    :style="{
                                        height: showMore && isClick ? 'auto' : '62px'}">
                                <template v-for="item in queryModel">
                                    <el-col v-if="item.component && handleAttribute(item.component.name,false)"
                                            :span="item.component ? handleAttribute(item.component.span,null) :null"
                                            :offset="item.component ? handleAttribute(item.component.offset,0) :0">
                                        <el-form-item :label="`${item.title}:`" :prop="item.key">
                                            <!--输入框-->
                                            <el-input v-if="item.component.name === 'el-input'"
                                                      v-model="queryData[item.key]"
                                                      v-bind="item.component"
                                                      :style="{width:handleAttribute(item.component.width,'100%')}"></el-input>
                                            <!--选择框-->
                                            <el-select
                                                    v-else-if="item.component.name === 'el-select'"
                                                    v-model="queryData[item.key]"
                                                    v-bind="item.component">
                                                <el-option
                                                        v-for="option in item.component.options"
                                                        :key="option.value"
                                                        v-bind="option">
                                                </el-option>
                                            </el-select>
                                            <!--级联选择器-->
                                            <el-cascader
                                                    v-else-if="item.component.name === 'el-cascader'"
                                                    v-model="queryData[item.key]"
                                                    v-bind="item.component">
                                            </el-cascader>
                                            <el-time-picker  v-else-if="item.component.name === 'el-time-picker'"
                                                             v-model="queryData[item.key]"
                                                             v-bind="item.component">
                                            </el-time-picker>
                                            <el-date-picker  v-else-if="item.component.name === 'el-date-picker'"
                                                             v-model="queryData[item.key]"
                                                             v-bind="item.component">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </template>
                                <el-col :span="null" :offset="0" v-if="showMore">
                                    <el-form-item>
                                        <div class="yi-table__buttons">
                                            <el-button type="primary" @click="handleQuery">查询</el-button>
                                            <el-button @click="handleClear">重置</el-button>
                                            <div v-if="$slots.operate">
                                                <slot name="operate" ></slot>
                                            </div>
                                        </div>
                                    </el-form-item>
                                </el-col>
                                <!--搜索更多-->
                                <div class="wrap-ext" :style="{display: showMore ? '' :'none'}" @click="handleMore">
                                    <span>更多<i :class="{
                                        'el-icon-arrow-down':!isClick,
                                        'el-icon-arrow-up':isClick}"></i></span>
                                </div>
                            </el-row>
                            <!--按钮-->
                            <el-form-item v-if="showMore ? (expandAll &&isClick ? false : !isClick) :true">
                                <div class="yi-table__buttons">
                                    <el-button type="primary" @click="handleQuery">查询1</el-button>
                                    <el-button @click="handleClear">重置1</el-button>
                                    <div v-if="$slots.operate">
                                        <slot name="operate" ></slot>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <!--表搜索-->
        <div class="yi-table__body">
            <!--表头内容-->
            <div class="yi-table__header" v-if="$slots.header">
                <slot name="header"></slot>
            </div>
            <!--列表内容-->
            <el-table role="table"
                      ref="table"
                      border
                      v-bind="options"
                      :data="data"
                      :header-cell-style="{padding: '10px 0', background: '#f3f3f3'}"
                      @select="handleSelect"
                      @select-all="handleSelectAll"
                      @selection-change="handleSelectionChange"
                      @cell-mouse-enter="handleCellMouseEnter"
                      @cell-mouse-leave="handleCellMouseLeave"
                      @cell-click="handleCellClick"
                      @cell-dblclick="handleCellDblclick"
                      @row-click="handleRowClick"
                      @row-contextmenu="handleRowContextmenu"
                      @row-dblclick="handleRowDblclick"
                      @header-click="handleHeaderClick"
                      @header-contextmenu="handleHeaderContextmenu"
                      @sort-change="handleSortChange"
                      @filter-change="handleFilterChange"
                      @current-change="handleCurrentChange"
                      @expand-change="handleExpandChange">
                <el-table-column type="selection" width="50px" v-if="selection"></el-table-column>
                <el-table-column v-for="(item,index) in columns"
                                 :key="`column__${index}`"
                                 v-bind="item"
                                 :width="isImageColumnWidth(item)"
                                 :prop="handleAttribute(item.key,null)"
                                 :label="handleAttribute(item.title,'')"
                                 :filters="item.filters ? item.filters : null"
                                 :filter-method="item.filterMethod ? item.filterMethod : null">
                    <template v-if="item.children"></template>
                    <template slot-scope="scope">
                        <div v-if="item.component && item.component.isEdit && handleAttributeShow(item.component.isEdit,scope.$index, scope.row)">
                            <el-input
                                    v-if="item.component && item.component.name === 'el-input'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-input>
                            <el-input-number
                                    v-else-if="item.component && item.component.name === 'el-input-number'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-input-number>
                            <el-radio-group
                                    v-else-if="item.component && item.component.name === 'el-radio'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                                <template v-if="item.component.buttonMode">
                                    <el-radio-button
                                            v-for="option in item.component.options"
                                            :key="option.value"
                                            :label="option.value">
                                        {{option.label}}
                                    </el-radio-button>
                                </template>
                                <template v-else>
                                    <el-radio
                                            v-for="option in item.component.options"
                                            :key="option.value"
                                            :label="option.value">
                                        {{option.label}}
                                    </el-radio>
                                </template>
                            </el-radio-group>
                            <el-checkbox-group
                                    v-else-if="item.component && item.component.name === 'el-checkbox'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                                <template v-if="item.component.buttonMode">
                                    <el-checkbox-button
                                            v-for="option in item.component.options"
                                            :key="option.value"
                                            :label="option.value">
                                        {{option.label}}
                                    </el-checkbox-button>
                                </template>
                                <template v-else>
                                    <el-checkbox
                                            v-for="option in item.component.options"
                                            :key="option.value"
                                            :label="option.value">
                                        {{option.label}}
                                    </el-checkbox>
                                </template>
                            </el-checkbox-group>
                            <el-select
                                    v-else-if="item.component && item.component.name === 'el-select'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                                <el-option
                                        v-for="option in item.component.options"
                                        :key="option.value"
                                        v-bind="option">
                                </el-option>
                            </el-select>
                            <el-cascader
                                    v-else-if="item.component && item.component.name === 'el-cascader'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-cascader>
                            <el-switch
                                    v-else-if="item.component && item.component.name === 'el-switch'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-switch>
                            <el-time-select
                                    v-else-if="item.component && item.component.name === 'el-time-select'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-time-select>
                            <el-time-picker
                                    v-else-if="item.component && item.component.name === 'el-time-picker'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-time-picker>
                            <el-date-picker
                                    v-else-if="item.component && item.component.name === 'el-date-picker'"
                                    v-model="scope.row[item.key]"
                                    v-bind="item.component"
                                    @change="$emit('row-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})">
                            </el-date-picker>
                            <slot :name="item.key" v-bind="scope.row" v-else>{{scope.row[item.key]}}</slot>
                        </div>
                        <slot :name="item.key" v-bind="scope.row" v-else>
                            <el-image
                                    v-if="item.component && item.component.name === 'el-image'"
                                    v-bind="item.component"
                                    style="border:1px solid #ddd;"
                                    :style="{height:isImageColumnHeight(item)}"
                                    lazy
                                    fit="cover"
                                    :src="scope.row[item.key]"
                                    :preview-src-list="[scope.row[item.key]]">
                            </el-image>
                            <span v-else-if="item.dataType && item.dataType === 'time'">
                                {{formatDate(scope.row[item.key])}}
                            </span>
                            <span v-else>
                                {{item.formatter ? item.formatter(scope.row, scope.column, scope.row[item.key], scope.$index) : scope.row[item.key]}}
                            </span>
                        </slot>
                    </template>
                </el-table-column>
                <!--操作栏-->
                <el-table-column v-if="rowHandle && handleRowHandleShow(rowHandle)"
                                 v-bind="rowHandle"
                                 :label="handleAttribute(rowHandle.title, '操作')"
                                 fixed="right">
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <div style="margin-right: 10px"
                                 v-for="(item,index) in handleAttribute(rowHandle.operate, [])"
                                 :key="index">
                                <el-button  size="mini"
                                            type="text"
                                            v-bind="item"
                                            v-if="handleAttributeShow(item.show, scope.$index, scope.row)"
                                            :disabled="handleAttributeDisabled(item.disabled, scope.row, scope.$index)"
                                            @click.stop="$emit(item.emit, {index: scope.$index, row: scope.row, event: $event})">{{item.text}}</el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="yi-table__foot" v-if="$slots.foot">
                <slot name="foot"></slot>
            </div>
            <div class="yi-table__pagination"
                 v-if="pagination">
                <el-pagination
                        v-if="pagination"
                        v-bind="pagination"
                        background
                        layout="total, prev, pager, next,jumper"
                        @current-change="handlePaginationCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import Tool from '../../mixins/tool'
    import renderCustomComponent from './renderCustomComponent.vue'
    export default {
        name: "YiTable",
        components: {
            renderCustomComponent
        },
        mixins:[Tool],
        props:{
            /**
             * @description 搜索栏的标签宽度
             */
            labelWidth:{type:String,default:'auto'},
            /**
             * @description 展开所有的搜索条件
             */
            expandAll:{type:Boolean,default:false},
            /**
             * @description 表格加载
             */
            loading: {type: Boolean, default: false},
            /**
             * @description 表格配置
             */
            options: {type: Object, default: null},
            /**
             * @description 表头数据
             */
            columns: {type: Array, required: true},
            /**
             * @description 表格数据
             */
            data: {type: Array, required: true},
            /**
             * @description 是否多选
             */
            selection: {type: Boolean, default: false},
            /**
             * @description 表格操作
             * title 标题   operate操作数组
             */
            rowHandle: {type: Object, default: null},
            /**
             * @description 表格数据
             */
            pagination: {type: [Object,Boolean], default(){return{currentPage: 1, pageSize: 10, total: 0}}}
        },
        watch:{
            columns:'judgeHeight',
            expandAll:'judgeHeight',
        },
        data(){
            return{
                queryData:{},
                isClick:false,
                showMore:false
            }
        },
        computed:{
            queryModel(){
                if(this.columns){
                    let columns=JSON.parse(JSON.stringify(this.columns))
                    let data=[]
                    let query={}
                    columns.forEach(item=>{
                        if(item.query !==undefined && typeof item.query === 'boolean' && item.query){
                            data.push(item)
                            query[item.key]=item.value !== undefined ? item.value : ''
                        }
                    })
                    this.queryData=query
                    return data
                }
                return null
            }
        },
        methods:{
            //判断是否发生溢出情况
            judgeHeight(){
                this.$nextTick(()=>{
                    if(this.$refs.fbody){
                        this.showMore = this.$refs.fbody.$el.scrollHeight>=this.$refs.fbody.$el.clientHeight ?true :false
                        this.isClick = this.expandAll && this.showMore
                    }
                })
            },
            //展开更多
            handleMore(){
                this.isClick=!this.isClick
            },
            isImageColumnWidth(item){
                if(item.width){
                    return  item.width
                }
                if(item.component && item.component.name === 'el-image'){
                    return 120 + 'px'
                }
            },
            isImageColumnHeight(item){
                if(item.height){
                    return  item.height
                }
                if(item.component && item.component.name === 'el-image'){
                    return 120 + 'px'
                }
            },
            handleRowHandleShow (rowHandle, index, row) {
                let data = this.handleAttribute(rowHandle.operate, [])
                for (let i = 0; i < data.length; i++) {
                    if (this.handleAttributeShow(data[i].show, index, row)) {
                        return true
                    }
                }
                return false
            },
            /**
             * @description 勾选数据时触发的事件
             */
            handleSelect (selection, row) {
                this.$emit('select', selection, row)
            },
            /**
             * @description 勾选全选时触发的事件
             */
            handleSelectAll (selection) {
                this.$emit('select-all', selection)
            },
            /**
             * @description 复选框选择项发生变化时触发的事件
             */
            handleSelectionChange (selection) {
                this.$emit('selection-change', selection)
            },
            /**
             * @description 单元格 hover 进入时触发的事件
             */
            handleCellMouseEnter (row, column, cell, event) {
                this.$emit('cell-mouse-enter', row, column, cell, event)
            },
            /**
             * @description 单元格 hover 退出时触发的事件
             */
            handleCellMouseLeave (row, column, cell, event) {
                this.$emit('cell-mouse-leave', row, column, cell, event)
            },
            /**
             * @description 单元格点击时触发的事件
             */
            handleCellClick (row, column, cell, event) {
                this.$emit('cell-click', row, column, cell, event)
            },
            /**
             * @description 单元格双击时触发的事件
             */
            handleCellDblclick (row, column, cell, event) {
                this.$emit('cell-dblclick', row, column, cell, event)
            },
            /**
             * @description 行点击时触发的事件
             */
            handleRowClick (row, event, column) {
                this.$emit('row-click', row, event, column)
            },
            /**
             * @description 行右键点击时触发的事件
             */
            handleRowContextmenu (row, event) {
                this.$emit('row-contextmenu', row, event)
            },
            /**
             * @description 行双击时触发的事件
             */
            handleRowDblclick (row, event) {
                this.$emit('row-dblclick', row, event)
            },
            /**
             * @description 表头点击时触发的事件
             */
            handleHeaderClick (column, event) {
                this.$emit('header-click', column, event)
            },
            /**
             * @description 表头右键点击时触发的事件
             */
            handleHeaderContextmenu (column, event) {
                this.$emit('header-contextmenu', column, event)
            },
            /**
             * @description 行选中状态
             */
            handleCurrentChange (currentRow, oldCurrentRow) {
                this.$emit('current-change', currentRow, oldCurrentRow)
            },
            handleSortChange (sort) {
                this.$emit('sort-change', sort)
            },
            handleFilterChange (filters) {
                this.$emit('filter-change', filters)
            },
            handleExpandChange(row,expandedRows ){
                this.$emit('expand-change', row,expandedRows)
            },
            handleQuery(){
                this.pagination.currentPage = 1
                let data=JSON.parse(JSON.stringify(this.queryData))
                this.$emit('query-changes',Object.assign(data,{
                    pageIndex:this.pagination.currentPage,
                    pageSize :this.pagination && this.pagination.pageSize ? this.pagination.pageSize : 100 }))
            },
            handleClear(){
                this.$refs.form.resetFields()
            },
            handlePaginationCurrentChange(page){
                this.pagination.currentPage = page
                let data=JSON.parse(JSON.stringify(this.queryData))
                this.$emit('query-changes',Object.assign(data,{
                    pageIndex:this.pagination.currentPage,
                    pageSize :this.pagination && this.pagination.pageSize ? this.pagination.pageSize : 100 }))
            },
            //得到查询条件的值
            getQueryCriteria(){
              return  JSON.parse(JSON.stringify(this.queryData))
            },
            //设置查询条件
            setQueryCriteria(data){
                let form=JSON.parse(JSON.stringify(this.queryData))
                Object.keys(data).forEach(key=>{
                    form[key]=data[key]
                })
                this.queryData=form
            }
        },
        mounted() {
            this.judgeHeight()

        }
    }
</script>

<style scoped>

</style>
