var $ = require('jquery');
var page = require('page');
var Navigation = require('../navigation/');
var Chat = require('../chat/');
var template = require('./template.jade');
var Header = require('../header/');

page('/contact', restrict, home);

function restrict(ctx, next) {
    console.log(ctx);
    next();
}

function home() {
    $('.js-app__container').html(template());
    var header = new Header('.main__section');
    var chat = new Chat('.main__section');
    var nav = new Navigation('.main__section');


}

function main() {

}
