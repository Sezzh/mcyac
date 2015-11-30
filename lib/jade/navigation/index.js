var $ = require('jquery');

var template = require('./template.jade');

function Navigation(selector) { //Esto se conoce como función constructor
    $(selector).after(template());
    var menuImgArray = [
            './assets/images/deptos.jpg',
            './assets/images/concept.jpg',
            './assets/images/serv.jpg',
            './assets/images/partners.jpg',
            './assets/images/manos.jpg'
        ];
    var menuItems = document.querySelectorAll('.js-list__item');
    function setImgMenu(menuImgArray, menuItems) {
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].style.backgroundImage = 'url(' + menuImgArray[i] + ')';
        }
    }
    setImgMenu(menuImgArray, menuItems);

}

module.exports = Navigation;
