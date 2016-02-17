'use strict';

var assert = require('assert');
var ejs = require('../index');

var TPL = '<p><%= name %>\n' +
    '<% if (gender == "m")\n{ %>\n' +
    '\t<span class="g">male</span>\n'+
    '<% }\relse{ %>\n' +
    '    <span>female</span>\r'+
    '<% } %>\n' +
    '</p>';

describe('silly-ejs', function () {
    it('should render `male` when `gender == "m"`', function () {
        var expect = '<p>Hans <span class="g">male</span> </p>';
        var res = ejs(TPL, {
            name: 'Hans',
            gender: 'm'
        });
        assert.equal(res, expect);
    });
    it('should render `female` when `gender != "m"`', function () {
        var expect = '<p>Chan <span>female</span> </p>';
        var res = ejs(TPL, {
            name: 'Chan',
            gender: 'f'
        });
        assert.equal(res, expect);
    });
    it('should return `&lt;&gt;` when `<>` in data', function () {
        var expect = '&lt;p&gt;&lt;/p&gt;';
        var res = ejs('<%=lt%>', {
            lt: '<p></p>'
        });
        assert.equal(res, expect);
    });
    it('should return `<>` when `<>` in data while using `<%- %>`', function () {
        var expect = '<p></p>';
        var res = ejs('<%-lt%>', {
            lt: expect
        });
        assert.equal(res, expect);
    });
    it('test multiple data types', function () {
        var DATA_STRING = 'str';
        var DATA_FUNCTION = function () {alert('fn');};
        var DATA_ARRAY = [1, 'two'];

        var TPL = '<%=number%>;<%=string%>;<%=fn%>;<%=array%>;<%=obj%>';
        var EXPECT = '12.3;' + DATA_STRING + ';' + DATA_FUNCTION.toString() + ';' + DATA_ARRAY.join(',') + ';[object Object]';

        var res = ejs(TPL, {
            number: 12.3,
            string: DATA_STRING,
            fn: DATA_FUNCTION,
            array: DATA_ARRAY,
            obj: { a: 1, b: 'two'}
        });

        assert.equal(res, EXPECT);
    });
});
