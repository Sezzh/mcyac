var $ = require('jquery');
var page = require('page');
var Navigation = require('../navigation/');
var Header = require('../header/');


var template = require('./template.jade');

    page('/partner', restrict, home);

function restrict(ctx, next) {
    console.log(ctx);
    next();
}

function home() {
    $('.js-app__container').html(template());
    var header = new Header('.main__section');
    var nav = new Navigation('.main__section');
}
