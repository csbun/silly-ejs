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

    // 代码部分不在字符串内，不需要 `\"` 和 `\\`
    function codeStringBack (code) {
        return code.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    module.exports = function(str, data) {
        var func = new Function('_data',
            'var __tpl="";with(_data){__tpl+="' + // 用 `""` 包裹字符串
            str.replace(/\\/g, '\\\\') // 字符串中的 `\` 要改成 `\\`
                .replace(/"/g, '\\"') // 字符串中的 `"` 要改成 `\"`
                .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
                    return '"+' + codeStringBack(code) + '+"';
                })
                .replace(/<%([\s\S]+?)%>/g, function(match, code) {
                    return '";' + codeStringBack(code) + '__tpl+="';
                })
                .replace(/[\r\n\t]/g, ' ') +
            '"};return __tpl;');
        return func ? func(data).replace(/\s+/g, ' ') : '';
    };

}));
