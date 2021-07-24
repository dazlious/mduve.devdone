(function() {

    var CLOSE_CLASS_NAME = 'imprint--close',
        OPEN_CLASS_NAME = 'imprint--open';

    var headTag = document.getElementsByTagName("head")[0],
        cssToBeLoaded = [
            "fonts/font-awesome.min.css",
            "css/main.css"
        ],
        imprintButtonToggle = document.querySelector(".imprint-toggle"),
        imprintContainer = imprintButtonToggle.parentNode;

    var Helper = {
        hasClass: function(element, className) {
            if (element.classList) {
                return element.classList.contains(className);
            } else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
            }
        },
        addClass: function(element, className) {
            if (element.classList) {
                element.classList.add(className);
            } else {
                element.className += ' ' + className;
            }
        },
        removeClass: function(element, className) {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        toggleClass: function(element, classToAdd, classToRemove) {
            Helper.addClass(element, classToAdd);
            Helper.removeClass(element, classToRemove);
        }
    };

    function loadCSS(path) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.media = "screen,print";
        link.href = path;
        headTag.appendChild(link);
    }

    function toggleImprint() {
        if (Helper.hasClass(imprintContainer, CLOSE_CLASS_NAME)) {
            Helper.toggleClass(imprintContainer, OPEN_CLASS_NAME, CLOSE_CLASS_NAME);
        } else {
            Helper.toggleClass(imprintContainer, CLOSE_CLASS_NAME, OPEN_CLASS_NAME);
        }
    }

    function bindEvents() {
        imprintButtonToggle.addEventListener('click', toggleImprint.bind(this), false);
    }

    function init() {

        cssToBeLoaded.forEach(function(cssUrl) {
            loadCSS(cssUrl);
        });

        bindEvents();

    }

    init();

})();
