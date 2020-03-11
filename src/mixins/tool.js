export default {
    methods: {
        /**
         * @description 组件属性默认值
         */
        handleAttribute (attribute, defaultValue) {
            if (attribute === false || attribute === 0 || attribute === '') {
                return attribute
            }
            return attribute || defaultValue
        },
        handleAttributeShow (show = true, index, row) {
            if (typeof show === 'boolean') {
                return show
            } else if (typeof show === 'function') {
                return show(index, row)
            }
            return Boolean(show)
        },
        handleAttributeDisabled (disabled = false, index, row) {
            if (typeof disabled === 'boolean') {
                return disabled
            } else if (typeof disabled === 'function') {
                return disabled(index, row)
            }
            return Boolean(disabled)
        },
        /**
         格式化时间
         */
        formatDate (date, fmt) {
            if (date === '' || date === null || date === undefined) {
                return null
            }
            if (fmt === '' || fmt == null || fmt === undefined) {
                fmt = 'yyyy-MM-dd hh:mm:ss'
            }
            date = new Date(date)
            var o = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                'S': date.getMilliseconds() // 毫秒
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
            return fmt
        }
    }
}
