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
        }
    }
}
