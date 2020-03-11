# table
---
###Table Attributes
|  参数 | 说明 | 类型 | 可选值 | 默认值 | 
| :-----| :-----| :-----| :-----| :-----|
|options|表格配置。参考:[options](https://element.eleme.cn/#/zh-CN/component/table)|Object|
|columns|表头设置。其中query为true,设置为搜索条件; component.isEdit=true,在线编辑; component中的设置参考[element-ui](https://element.eleme.cn/); dataType数据类型,目前有time,对时间格式化|Array|title,key,query,value,data-type[time],component|
|data|表格数据|Array|
|selection|是否多选|False|
|rowHandle|表格操作.{operate:[]}|Object|text,emit,show,disabled|show:boolean,Function|
|pagination|翻页|Object,Boolean|currentPage,pageSize,total|pageSize=10,total=0|

###Slot
|  name | 说明 |
| :-----| :-----|
|header|表格表头 自定义|
|operate|查询表格|
|key| 表格显示的key,自定义内容

###Methods
|  方法名 | 说明 | 参数|
| :-----| :-----|:-----|
|setQueryCriteria|设置查询条件|Object|
|getQueryCriteria|得到查询条件|

###Events
|  事件名称| 说明 |回调参数|
| :-----| :-----|:-----|
|query-changes|查询事件|object|
|row-data-change|component.isEdit为true,项发生变化时会触发该事件|rowIndex,key,value,row|
|table点击事件|参考:[event](https://element.eleme.cn/#/zh-CN/component/table)|
