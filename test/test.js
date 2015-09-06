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
});
