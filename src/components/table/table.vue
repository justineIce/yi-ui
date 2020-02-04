<template>
    <div class="yi-table">
        <div class="yi-ui__header">

        </div>
        <div class="yi-ui__body">
            <!--列表内容-->
            <div class="yi-ui__table">
                <el-table role="table"
                          ref="table"
                          border
                          v-bind="options"
                          :data="data"
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
                          @current-change="handleCurrentChange">
                    <el-table-column v-for="(item,index) in columns"
                                     :key="`column__${index}`"
                                     v-bind="item"
                                     :prop="item.key"
                                     :label="item.title">
                        <template slot-scope="scope">
                            <slot :name="item.key" v-bind="scope.row">
                                {{item.formatter ? item.formatter(scope.row, scope.column, scope.row[item.key], scope.$index) : scope.row[item.key]}}
                            </slot>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--翻页空间-->
            <div class="yi-ui__pagination">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "YiTable",
        props:{
            /**
             * @description 表格配置
             */
            options: {
                type: Object,
                default: null
            },
            /**
             * @description 表头数据
             */
            columns: {
                type: Array,
                request: true
            },
            /**
             * @description 表格数据
             */
            data: {
                type: Array,
                request: true
            },
        },
        data(){
            return{

            }
        },
        methods:{
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
                this.selectionData = selection
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
            }
        }
    }
</script>

<style scoped>

</style>
