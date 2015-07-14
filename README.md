# silly-ejs

A simple and small implement for [EJS](http://www.embeddedjs.com/)

## Install

```
npm i silly-ejs
```

## Usage

```javascript
var ejs = require('silly-ejs');
var tpl = '<div><%= name %></div>';
var data = {
    name: 'Hans Chan'
};
var html = ejs(tpl, data);
console.log(html);
// '<div>Hans Chan</div>'
```

