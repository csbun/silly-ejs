'use strict';

module.exports = function(str, data) {
    var func = new Function('_data',
        'var __tpl="";with(_data){__tpl+="' + // 用 `""` 包裹字符串
        str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"') // 字符串中的 `"` 要改成 `\"`
            .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
                // 代码部分不在字符串内，不需要 `\"`
                return '"+' + code.replace(/\\"/g, '"') + '+"';
            })
            .replace(/<%([\s\S]+?)%>/g, function(match, code) {
                return '";' + code.replace(/\\"/g, '"') + '__tpl+="';
            })
            .replace(/[\r\n\t]/g, ' ') +
        '"};return __tpl;');
    return func ? func(data).replace(/\s+/g, ' ') : '';
};
