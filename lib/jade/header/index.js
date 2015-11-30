var $ = require('jquery');

var template = require('./template.jade');

function Header(selector) {
    $(selector).before(template());
}

module.exports = Header;
