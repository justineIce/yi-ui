# table
---
###Table Attributes
|  参数 | 参数说明 | 类型 | 内容说明 |可选值 | 默认值 | 
| :-----| :-----| :-----| :-----| :-----| :-----|
|expand-all|展开所有的搜索条件|String|—|—|false|
|label-width|搜索栏的标签宽度|String|—|—|auto|
|options|表格配置|Object|参考:[options](https://element.eleme.cn/#/zh-CN/component/table)|—|—|
|columns|表头设置|Array|参数:title,key,query,show,value,data-type,component。其中query为true,设置为搜索条件;component.isEdit=true,在线编辑;component中的设置参考[element-ui](https://element.eleme.cn/);dataType设置数据类型,目前有time,对时间格式化。|—|—|
|data|表格数据|Array|—|—|—|
|selection|是否多选|Boolean|—|—|false|
|rowHandle|表格操作|Object|结构：{operate:[]}。包含text,emit,show,disabled参数。其中show，disabled类型为:[boolean,Function]|—|—|
|pagination|翻页设置|Object,Boolean|currentPage,pageSize,total||pageSize=10|

###Slotn
|  name | 说明 |
| :-----| :-----|
|header|表格表头 自定义|
|foot|表格表尾 自定义|
|operate|搜索栏的按钮自定义|
|key| 表格显示的key,自定义内容|

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
