# silly-ejs

A simple and small implement for [EJS](http://www.embeddedjs.com/)

[![NPM](https://nodei.co/npm/silly-ejs.png?compact=true)](https://nodei.co/npm/silly-ejs/)

[![Build Status](https://travis-ci.org/csbun/silly-ejs.svg)](https://travis-ci.org/csbun/silly-ejs)
[![Coverage Status](https://coveralls.io/repos/csbun/silly-ejs/badge.svg?branch=master&service=github)](https://coveralls.io/github/csbun/silly-ejs?branch=master)

## Install

```
npm i silly-ejs
```

## Usage

```javascript
var ejs = require('silly-ejs');
var tpl = '<div><%= name %><% if (age > 17) { %>(adult)<% } %></div>';
var data = {
    name: 'Hans Chan',
    age: 18
};
var html = ejs(tpl, data);
console.log(html);
// '<div>Hans Chan(adult)</div>'
```

