var $ = require('jquery');
var page = require('page');
var Navigation = require('../navigation/');
var Header = require('../header/');

page('*', notFound);

var template = require('../jade/index/template.jade');

function notFound() {
    $('.js-app__container').html(template());
    var header = new Header('.main__section');
    var nav = new Navigation('.main__section');
}
