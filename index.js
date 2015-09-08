(function(root, factory) {
    'use strict';
    /* istanbul ignore else  */
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(function() {
            return factory();
        });
    } else if (typeof define === 'function' && define.cmd) {
        // CMD
        define(function(require, exports, module) {
            module.exports = factory();
        });
    } else {
        // Global Variables
        root.sillyEjs = factory();
    }
}(this, function() {
    'use strict';

    return function(str, data) {
        var func = new Function('_data',
            'var __tpl="";with(_data){__tpl+="' + // 用 `""` 包裹字符串
            str.replace(/\\/g, '\\\\') // 字符串中的 `\` 要改成 `\\`
                .replace(/"/g, '\\"') // 字符串中的 `"` 要改成 `\"`
                .replace(/[\r\n\t]/g, ' ') // 去除字符串中的换行 TODO: 可能会去除掉代码内的这些内容，同时 <code> 内的也会被去到
                .replace(/<%(=?)([\s\S]+?)%>/g, function(match, display, code) {
                    // 代码部分不在字符串内，不需要 `\"` 和 `\\`
                    var translatedCode = code.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                    if (display) {
                        // 显示数据，先转换成 string，再替换 < > 防止 XSS
                        return '"+(""+' + translatedCode + ').replace(/</g, "&lt;").replace(/>/g, "&gt;")+"';
                    } else {
                        // 运行代码片段
                        return '";' + translatedCode + '__tpl+="';
                    }
                }) +
            '"};return __tpl;');
        return func ? func(data).replace(/\s+/g, ' ') : '';
    };

}));
