(function() {

    var CLOSE_CLASS_NAME = 'imprint--close',
        OPEN_CLASS_NAME = 'imprint--open';

    var headTag = document.getElementsByTagName("head")[0],
        cssToBeLoaded = [
            "https://fonts.googleapis.com/css?family=Open+Sans:400,700|Open+Sans+Condensed:700",
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

        // Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-87245235-1', 'auto');
        ga('send', 'pageview');
    }

    init();

})();
