# form-show
---
### Attributes
|参数 |参数说明 |类型 |内容说明 |可选值 |默认值 | 
|:-----|:-----|:-----|:-----|:-----|:-----|
|border|是否有边框|Boolean|—|—|false|
|labelBgColor|标签背景,border为true|String|—|—|—|
|borderColor|边框宽度,border为true|String|—|—|—|
|labelWidth|标签宽度|String|—|—|—|
|labelPosition|标签的位置|String|—|right/left/top|left|
|span|栅格占据的列数|Number|—|—|24|
|data|数据|Object|—|—|—|
|template|模板|Object|—|包括title,show,span,formatter,component,dataType,format。组件包括自定义组件、el-tag,el-button,el-link|format:'yyyy-MM-dd hh:mm:ss'|


###Slot
|name |说明 |
|:-----| :-----|
|key| 表格显示的key,自定义内容|
