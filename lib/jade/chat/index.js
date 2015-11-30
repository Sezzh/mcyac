var $ = require('jquery');
var io = require('socket.io-client');

var socket = io();

var template = require('./template.jade');

function Chat(selector) {
    $(selector).html(template());
    $('.js-main__section__chat__player').submit(function() {
        socket.emit('chat message', $('.js-chat__m').val());
        $('.js-chat__m').val('');
        return false
    });
    socket.on('chat message', function(msg) {
        $('.js-chat__messages').append($('<li>').text(msg));
        console.log(msg);
    });

}

module.exports = Chat;
