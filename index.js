'use strict';

module.exports = function(str, data) {
    /*jshint evil: true */
    var func = new Function('_data', 'var __tpl="";with(_data){__tpl+="' +
        str.replace(/\\/g, '\\\\')
        .replace(/\"/g, '\\"')
        .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
            return '"+' + code.replace(/\\"/g, '"') + '+"';
        })
        .replace(/<%([\s\S]+?)%>/g, function(match, code) {
            return '";' + code.replace(/\\"/g, '"')
                .replace(/[\r\n\t]/g, ' ') + '__tpl+="';
        })
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t') +
        '"};return __tpl;');
    /*jshint evil: false */
    return func ? func(data) : '';
};
