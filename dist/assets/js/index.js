(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachClickEvents = void 0; //private

var goToTopButton = $('#c-go-top');

var goToTop = function goToTop(event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 500);
};

var dropdown = $('.navbar-link');
var submenus = $('#main-menu .navbar-dropdown');
var accordionLink = $('.accordion-title');
var accordionContent = $('.accordion-content');
var shortcuts = $('.player-shortcut');
var player_button = $('#player-button-play'); //==================================================
// Player popup
//==================================================

var rk_WindowObjectReference = null;

function playerPopup() {
  $('.button.call-to-action, #player-main-call-to-action').click(function (e) {
    e.preventDefault();
    openRequestedPopup($(this).attr('href'));
    return false;
  });
}

function openRequestedPopup(url) {
  if (rk_WindowObjectReference == null || rk_WindowObjectReference.closed) {
    rk_WindowObjectReference = window.open(url, "RK_Player", "width=360,height=640");
  } else {
    rk_WindowObjectReference.focus();
  }
} //NAVIGATION


function initNav(link, element) {
  link.on('click', function () {
    $(this).toggleClass('open');

    if ($(this).hasClass('open')) {
      $(this).siblings(element).slideDown(300);
    } else {
      $(this).siblings(element).slideUp(300);
    }
  });
}

function togglePlay() {
  shortcuts.on('click', function () {
    shortcuts.not($(this)).removeClass('play');
    $(this).toggleClass('play');
  });
}

function playerTogglePlay() {
  player_button.on('click', function () {
    $(this).toggleClass('playing');
  });
}

function responsiveNav() {
  if (Modernizr.mq('(max-width: 1087px)')) {
    initNav(dropdown, submenus);
  }
}

var attachClickEvents = function attachClickEvents() {
  goToTopButton.on('click', goToTop);
  responsiveNav();
  $(window).on('resize', _.debounce(responsiveNav, 100));
  initNav(accordionLink, accordionContent);
  playerTogglePlay();
  togglePlay();
  playerPopup();
};

exports.attachClickEvents = attachClickEvents;

},{}],2:[function(require,module,exports){
'use strict';
/*jshint esversion: 6 */

var _scroll_events = require("./scroll_events.js");

var _click_events = require("./click_events.js");

var _media_size = require("./media_size.js");

var rkUtilities = _interopRequireWildcard(require("./utils.js"));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

(0, _scroll_events.attachScrollEvents)();
(0, _click_events.attachClickEvents)();
(0, _media_size.responsiveResizing)();
rkUtilities.dropdownHandler();
rkUtilities.burgerHandler();
rkUtilities.attachCarousels();
rkUtilities.tabs();
rkUtilities.contentSwiper(); //testy

},{"./click_events.js":1,"./media_size.js":3,"./scroll_events.js":4,"./utils.js":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responsiveResizing = responsiveResizing;

var mediaSize = function mediaSize() {
  if (Modernizr.mq('(max-width: 600px)')) {
    $('.responsive-carousel').addClass('is-1');
    $('.responsive-carousel').removeClass('is-2 is-4');
  } else if (Modernizr.mq('(max-width: 900px)')) {
    $('.responsive-carousel').addClass('is-2');
    $('.responsive-carousel').removeClass('is-1 is-4');
  } else if (Modernizr.mq('(min-width: 1088px)')) {
    $('.responsive-carousel').addClass('is-4');
    $('.responsive-carousel').removeClass('is-1 is-2');
  }
};

function responsiveResizing() {
  mediaSize();
  $(window).on('resize', _.debounce(mediaSize, 100));
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachScrollEvents = void 0; //private

var adspace = $('#top-add').outerHeight(true);
var navbar = $('#main-nav');
var youtubeLive = $('#sidebar-fixedIframe-wrapper');
var youtubeLiveScrollTop = $('#sidebar-fixedIframe-wrapper').offset();
var goToTop = $('#c-go-top');

function fixNavbarOnScroll() {
  //bez debounce
  var windowScrollTop = $(window).scrollTop();

  if (windowScrollTop >= adspace) {
    navbar.addClass('is-fixed-top');
    $('body').addClass('has-navbar-fixed-top');
  } else {
    navbar.removeClass('is-fixed-top');
    $('body').removeClass('has-navbar-fixed-top');
  }
}

function fixedVideo(windowScrollTop) {
  if (youtubeLive.length != 0) {
    if (windowScrollTop >= youtubeLiveScrollTop.top) {
      youtubeLive.addClass('fixed-player');
    } else {
      youtubeLive.removeClass('fixed-player');
    }
  }
}

function toTheTop(windowScrollTop) {
  var offset = 1000;
  var fadeDuration = 500;

  if (windowScrollTop > offset) {
    goToTop.fadeTo(fadeDuration, 0.8);
  } else if (windowScrollTop <= offset) {
    goToTop.fadeOut(fadeDuration);
  }
}

function debouncedScrollEvents() {
  var windowScrollTop = $(window).scrollTop();
  fixedVideo(windowScrollTop);
  toTheTop(windowScrollTop);
}

var attachScrollEvents = function attachScrollEvents() {
  $(window).on('scroll', _.debounce(debouncedScrollEvents, 200, {
    leading: true
  }));
  fixNavbarOnScroll(); //fire once on start

  $(window).on('scroll', fixNavbarOnScroll);
};

exports.attachScrollEvents = attachScrollEvents;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdownHandler = dropdownHandler;
exports.burgerHandler = burgerHandler;
exports.attachCarousels = attachCarousels;
exports.contentSwiper = contentSwiper;
exports.tabs = tabs;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var dropdown = $('#stream-dropdown');
var navbarBurgers = $('.navbar-burger');
/* ==================================================
                    Dropdown
================================================== */

function dropdownHandler() {
  dropdown.on('click', function (e) {
    $(e.currentTarget).toggleClass('is-active');
    $(e.currentTarget.dataset.target).slideToggle("slow");
  });
}
/* ==================================================
                   Burger Menu
================================================== */


function burgerHandler() {
  navbarBurgers.on('click', function (e) {
    $(e.currentTarget).toggleClass('is-active');
    console.log(e.currentTarget.dataset);
    $(e.currentTarget.dataset.target).toggleClass('is-active');
  });
}
/* ==================================================
                   Carousels
================================================== */


function attachCarousels() {
  var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances
}
/* ==================================================
                   Accordion
================================================== */
// class rkAccordion {
//   constructor(selector) {
//     this.instance = $(selector);
//     this.accordionLinks = $(this.element).find('.accordion-title, navbar-link');
//     this.init();
//   }
//
//   static attach(selector = '.accordion, .navbar-menu') {
//     let instances = new Array();
//     const elements = document.querySelectorAll(selector);
//     [].forEach.call(elements, element => {
//       setTimeout(() => {
//         instances.push(new rkAccordion(element));
//       }, 100);
//     });
//     return instances;
//   }
//
//   init() {
//     this.accordionLinks.click()
//     console.log("accordion initiated");
//   }
//
// }
//
// export function accordions() {
//   var accordions = rkAccordion.attach();
// }

/* ==================================================
                   Swiper
================================================== */


var rkSwiper =
/*#__PURE__*/
function () {
  function rkSwiper(selector) {
    _classCallCheck(this, rkSwiper);

    this.element = $(selector);
    this.scope = $(this.element).data('scope');
    this.prevButton = $(".swiperPrevButton[data-scope=".concat(this.scope, "]"));
    this.nextButton = $(".swiperNextButton[data-scope=".concat(this.scope, "]"));
    this.items = $(this.element).find('.swiper-item'); //current element

    this.counter = 0;
    this.length = this.items.length; //functions

    this.nextIndexAddActive = this.nextIndexAddActive.bind(this);
    this.prevIndexAddActive = this.prevIndexAddActive.bind(this);
    this.init();
  }

  _createClass(rkSwiper, [{
    key: "init",
    value: function init() {
      this.togglebuttons();
      this.bindEvents();
    }
  }, {
    key: "togglebuttons",
    value: function togglebuttons() {
      if (this.counter === 0) {
        $(this.prevButton).removeClass('inactive');
        $(this.nextButton).addClass('inactive');
      } else {
        $(this.prevButton).addClass('inactive');
        $(this.nextButton).removeClass('inactive');
      }
    }
  }, {
    key: "nextIndexAddActive",
    value: function nextIndexAddActive() {
      if (this.counter < this.length - 1) {
        this.counter++;
        $(this.items[this.counter]).addClass('is-active').prev().removeClass('is-active');
        $(".current-day.is-active[data-scope=".concat(this.scope, "]")).next().addClass('is-active').prev().removeClass('is-active');
        this.togglebuttons();
      }
    }
  }, {
    key: "prevIndexAddActive",
    value: function prevIndexAddActive() {
      if (this.counter > 0) {
        this.counter--;
        $(this.items[this.counter]).addClass('is-active').next().removeClass('is-active');
        $(".current-day.is-active[data-scope=".concat(this.scope, "]")).prev().addClass('is-active').next().removeClass('is-active');
        this.togglebuttons();
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      $(this.prevButton).click(this.nextIndexAddActive);
      $(this.nextButton).click(this.prevIndexAddActive);
    }
  }], [{
    key: "attach",
    value: function attach() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.swiper-content';
      var instances = new Array();
      var elements = document.querySelectorAll(selector);
      [].forEach.call(elements, function (element) {
        setTimeout(function () {
          instances.push(new rkSwiper(element));
        }, 100);
      });
      return instances;
    }
  }]);

  return rkSwiper;
}();

function contentSwiper() {
  var swipers = rkSwiper.attach();
}
/* ==================================================
                   Tabs
================================================== */
//TODO: use data-attributes to create tab groups to prevent tabs from conflicting in case of multiple instances


function tabs() {
  $('.tab-title').on('click', function () {
    var tab = $(this).data('tab-content');
    $('.tab-title').removeClass('is-active');
    $(this).addClass('is-active');

    if ($('#' + tab).hasClass('is-hidden-mobile')) {
      $('.content-tab').addClass('is-hidden-mobile');
      console.log($(this).data('tab-content'));
      $('#' + tab).removeClass('is-hidden-mobile');
    }

    if ($('#' + tab).hasClass('is-hidden')) {
      $('.content-tab').addClass('is-hidden');
      console.log($(this).data('tab-content'));
      $('#' + tab).removeClass('is-hidden');
    }
  });
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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QWMsRUFBZDtBQUNEO0FBRUQ7OztBQUdBOzs7QUFFTyxTQUFBLElBQUEsR0FBZ0I7QUFDckIsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsRUFBQSxDQUFBLE9BQUEsRUFBNEIsWUFBVztBQUNuQyxRQUFJLEdBQUcsR0FBRyxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsSUFBQSxDQUFWLGFBQVUsQ0FBVjtBQUVBLElBQUEsQ0FBQyxDQUFELFlBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxXQUFBO0FBQ0EsSUFBQSxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsUUFBQSxDQUFBLFdBQUE7O0FBRUEsUUFBSSxDQUFDLENBQUMsTUFBRixHQUFDLENBQUQsQ0FBQSxRQUFBLENBQUosa0JBQUksQ0FBSixFQUFnRDtBQUM5QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsa0JBQUE7QUFDQSxNQUFBLE9BQU8sQ0FBUCxHQUFBLENBQVksQ0FBQyxDQUFELElBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBWixhQUFZLENBQVo7QUFDQSxNQUFBLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxrQkFBQTtBQUNEOztBQUVELFFBQUksQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsUUFBQSxDQUFKLFdBQUksQ0FBSixFQUF5QztBQUN2QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsV0FBQTtBQUNBLE1BQUEsT0FBTyxDQUFQLEdBQUEsQ0FBWSxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsSUFBQSxDQUFaLGFBQVksQ0FBWjtBQUNBLE1BQUEsQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsV0FBQSxDQUFBLFdBQUE7QUFDRDtBQWhCTCxHQUFBO0FBbUJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9wcml2YXRlXHJcbmxldCBnb1RvVG9wQnV0dG9uID0gJCgnI2MtZ28tdG9wJyk7XHJcbmxldCBnb1RvVG9wID0gKGV2ZW50KT0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgfSwgNTAwKTtcclxufVxyXG5cclxubGV0IGRyb3Bkb3duID0gJCgnLm5hdmJhci1saW5rJyk7XHJcbmxldCBzdWJtZW51cyA9ICQoJyNtYWluLW1lbnUgLm5hdmJhci1kcm9wZG93bicpO1xyXG5sZXQgYWNjb3JkaW9uTGluayA9ICQoJy5hY2NvcmRpb24tdGl0bGUnKTtcclxubGV0IGFjY29yZGlvbkNvbnRlbnQgPSAkKCcuYWNjb3JkaW9uLWNvbnRlbnQnKTtcclxubGV0IHNob3J0Y3V0cyA9ICQoJy5wbGF5ZXItc2hvcnRjdXQnKTtcclxubGV0IHBsYXllcl9idXR0b24gPSAkKCcjcGxheWVyLWJ1dHRvbi1wbGF5Jyk7XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQbGF5ZXIgcG9wdXBcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG52YXIgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gbnVsbDtcclxuZnVuY3Rpb24gcGxheWVyUG9wdXAoKSB7XHJcbiAgJCgnLmJ1dHRvbi5jYWxsLXRvLWFjdGlvbiwgI3BsYXllci1tYWluLWNhbGwtdG8tYWN0aW9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblJlcXVlc3RlZFBvcHVwKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJlcXVlc3RlZFBvcHVwKHVybCkge1xyXG4gIGlmIChya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPT0gbnVsbCB8fCBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuY2xvc2VkKSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPSB3aW5kb3cub3Blbih1cmwsIFwiUktfUGxheWVyXCIsIFwid2lkdGg9MzYwLGhlaWdodD02NDBcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG5cclxuLy9OQVZJR0FUSU9OXHJcbmZ1bmN0aW9uIGluaXROYXYobGluaywgZWxlbWVudCkge1xyXG4gICAgbGluay5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb3BlbicpKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhlbGVtZW50KS5zbGlkZURvd24oMzAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKGVsZW1lbnQpLnNsaWRlVXAoMzAwKTtcclxuICAgICAgfVxyXG4gICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUGxheSgpIHtcclxuICBzaG9ydGN1dHMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHNob3J0Y3V0cy5ub3QoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoJ3BsYXknKTtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3BsYXknKTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5ZXJUb2dnbGVQbGF5KCkge1xyXG4gIHBsYXllcl9idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3BsYXlpbmcnKTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNwb25zaXZlTmF2KCkge1xyXG4gIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogMTA4N3B4KScpKSB7XHJcbiAgICAgIGluaXROYXYoZHJvcGRvd24sIHN1Ym1lbnVzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoQ2xpY2tFdmVudHMgPSAoKSA9PiB7XHJcbiAgZ29Ub1RvcEJ1dHRvbi5vbignY2xpY2snLCBnb1RvVG9wKTtcclxuICByZXNwb25zaXZlTmF2KClcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoIHJlc3BvbnNpdmVOYXYsIDEwMCkpO1xyXG4gIGluaXROYXYoYWNjb3JkaW9uTGluaywgYWNjb3JkaW9uQ29udGVudCk7XHJcbiAgcGxheWVyVG9nZ2xlUGxheSgpO1xyXG4gIHRvZ2dsZVBsYXkoKTtcclxuICBwbGF5ZXJQb3B1cCgpO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5pbXBvcnQgeyBhdHRhY2hTY3JvbGxFdmVudHMgfSBmcm9tICcuL3Njcm9sbF9ldmVudHMuanMnO1xuaW1wb3J0IHsgYXR0YWNoQ2xpY2tFdmVudHMgfSBmcm9tICcuL2NsaWNrX2V2ZW50cy5qcyc7XG5pbXBvcnQgeyByZXNwb25zaXZlUmVzaXppbmcgfSBmcm9tICcuL21lZGlhX3NpemUuanMnO1xuaW1wb3J0ICogYXMgcmtVdGlsaXRpZXMgZnJvbSAnLi91dGlscy5qcydcbmF0dGFjaFNjcm9sbEV2ZW50cygpO1xuYXR0YWNoQ2xpY2tFdmVudHMoKTtcbnJlc3BvbnNpdmVSZXNpemluZygpO1xucmtVdGlsaXRpZXMuZHJvcGRvd25IYW5kbGVyKCk7XG5ya1V0aWxpdGllcy5idXJnZXJIYW5kbGVyKCk7XG5ya1V0aWxpdGllcy5hdHRhY2hDYXJvdXNlbHMoKTtcbnJrVXRpbGl0aWVzLnRhYnMoKTtcbnJrVXRpbGl0aWVzLmNvbnRlbnRTd2lwZXIoKTtcbi8vdGVzdHlcbiIsImNvbnN0IG1lZGlhU2l6ZSA9ICgpID0+IHtcclxuICAgICAgaWYoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiA2MDBweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTEnKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0yIGlzLTQnKTtcclxuICAgICAgfSBlbHNlIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogOTAwcHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy0yJyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMSBpcy00Jyk7XHJcbiAgICAgIH0gZWxzZSBpZihNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6IDEwODhweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTQnKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0xIGlzLTInKTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2l2ZVJlc2l6aW5nKCkge1xyXG4gIG1lZGlhU2l6ZSgpO1xyXG4gICQod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZSggbWVkaWFTaXplLCAxMDApKTtcclxufVxyXG4iLCIgIC8vcHJpdmF0ZVxyXG4gIGxldCBhZHNwYWNlID0gJCgnI3RvcC1hZGQnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICBsZXQgbmF2YmFyID0gJCgnI21haW4tbmF2Jyk7XHJcbiAgbGV0IHlvdXR1YmVMaXZlID0gJCgnI3NpZGViYXItZml4ZWRJZnJhbWUtd3JhcHBlcicpO1xyXG4gIGxldCB5b3V0dWJlTGl2ZVNjcm9sbFRvcCA9ICQoJyNzaWRlYmFyLWZpeGVkSWZyYW1lLXdyYXBwZXInKS5vZmZzZXQoKTtcclxuICBsZXQgZ29Ub1RvcCA9ICQoJyNjLWdvLXRvcCcpO1xyXG5cclxuICBmdW5jdGlvbiBmaXhOYXZiYXJPblNjcm9sbCgpIHtcclxuICAgIC8vYmV6IGRlYm91bmNlXHJcbiAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBpZiAod2luZG93U2Nyb2xsVG9wID49IGFkc3BhY2UpIHtcclxuICAgICAgICAgIG5hdmJhci5hZGRDbGFzcygnaXMtZml4ZWQtdG9wJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hhcy1uYXZiYXItZml4ZWQtdG9wJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkLXRvcCcpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoYXMtbmF2YmFyLWZpeGVkLXRvcCcpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaXhlZFZpZGVvKHdpbmRvd1Njcm9sbFRvcCkge1xyXG4gICAgaWYoeW91dHViZUxpdmUubGVuZ3RoICE9IDApIHtcclxuICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+PSB5b3V0dWJlTGl2ZVNjcm9sbFRvcC50b3ApIHtcclxuICAgICAgICAgIHlvdXR1YmVMaXZlLmFkZENsYXNzKCdmaXhlZC1wbGF5ZXInKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHlvdXR1YmVMaXZlLnJlbW92ZUNsYXNzKCdmaXhlZC1wbGF5ZXInKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9UaGVUb3Aod2luZG93U2Nyb2xsVG9wKSB7XHJcbiAgICBsZXQgb2Zmc2V0ID0gMTAwMDtcclxuICAgIHZhciBmYWRlRHVyYXRpb24gPSA1MDA7XHJcbiAgICBpZiAod2luZG93U2Nyb2xsVG9wID4gb2Zmc2V0KSB7XHJcbiAgICAgICAgZ29Ub1RvcC5mYWRlVG8oZmFkZUR1cmF0aW9uLCAwLjgpO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3dTY3JvbGxUb3AgPD0gb2Zmc2V0KSB7XHJcbiAgICAgICAgZ29Ub1RvcC5mYWRlT3V0KGZhZGVEdXJhdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlYm91bmNlZFNjcm9sbEV2ZW50cyAoKSB7XHJcbiAgICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIGZpeGVkVmlkZW8od2luZG93U2Nyb2xsVG9wKTtcclxuICAgICAgdG9UaGVUb3Aod2luZG93U2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoU2Nyb2xsRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIF8uZGVib3VuY2UoZGVib3VuY2VkU2Nyb2xsRXZlbnRzLCAyMDAsIHtsZWFkaW5nOiB0cnVlfSkpO1xyXG4gICAgICBmaXhOYXZiYXJPblNjcm9sbCgpOyAvL2ZpcmUgb25jZSBvbiBzdGFydFxyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZpeE5hdmJhck9uU2Nyb2xsKTtcclxuICB9XHJcbiIsImNvbnN0IGRyb3Bkb3duID0gJCgnI3N0cmVhbS1kcm9wZG93bicpO1xyXG5jb25zdCBuYXZiYXJCdXJnZXJzID0gJCgnLm5hdmJhci1idXJnZXInKTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICAgRHJvcGRvd25cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyb3Bkb3duSGFuZGxlcigpe1xyXG4gIGRyb3Bkb3duLm9uKCdjbGljaycsICgoZSkgPT4ge1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCkuc2xpZGVUb2dnbGUoXCJzbG93XCIpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIEJ1cmdlciBNZW51XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBidXJnZXJIYW5kbGVyKCl7XHJcbiAgbmF2YmFyQnVyZ2Vycy5vbignY2xpY2snLCgoZSkgPT4ge1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldCk7XHJcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgQ2Fyb3VzZWxzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hDYXJvdXNlbHMoKSB7XHJcbiAgdmFyIGNhcm91c2VscyA9IGJ1bG1hQ2Fyb3VzZWwuYXR0YWNoKCk7IC8vIGNhcm91c2VscyBub3cgY29udGFpbnMgYW4gYXJyYXkgb2YgYWxsIENhcm91c2VsIGluc3RhbmNlc1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgQWNjb3JkaW9uXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vLyBjbGFzcyBya0FjY29yZGlvbiB7XHJcbi8vICAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcclxuLy8gICAgIHRoaXMuaW5zdGFuY2UgPSAkKHNlbGVjdG9yKTtcclxuLy8gICAgIHRoaXMuYWNjb3JkaW9uTGlua3MgPSAkKHRoaXMuZWxlbWVudCkuZmluZCgnLmFjY29yZGlvbi10aXRsZSwgbmF2YmFyLWxpbmsnKTtcclxuLy8gICAgIHRoaXMuaW5pdCgpO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gICBzdGF0aWMgYXR0YWNoKHNlbGVjdG9yID0gJy5hY2NvcmRpb24sIC5uYXZiYXItbWVudScpIHtcclxuLy8gICAgIGxldCBpbnN0YW5jZXMgPSBuZXcgQXJyYXkoKTtcclxuLy8gICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbi8vICAgICBbXS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4vLyAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuLy8gICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgcmtBY2NvcmRpb24oZWxlbWVudCkpO1xyXG4vLyAgICAgICB9LCAxMDApO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgICByZXR1cm4gaW5zdGFuY2VzO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gICBpbml0KCkge1xyXG4vLyAgICAgdGhpcy5hY2NvcmRpb25MaW5rcy5jbGljaygpXHJcbi8vICAgICBjb25zb2xlLmxvZyhcImFjY29yZGlvbiBpbml0aWF0ZWRcIik7XHJcbi8vICAgfVxyXG4vL1xyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBhY2NvcmRpb25zKCkge1xyXG4vLyAgIHZhciBhY2NvcmRpb25zID0gcmtBY2NvcmRpb24uYXR0YWNoKCk7XHJcbi8vIH1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBTd2lwZXJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuY2xhc3MgcmtTd2lwZXIge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gJChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnNjb3BlID0gJCh0aGlzLmVsZW1lbnQpLmRhdGEoJ3Njb3BlJyk7XHJcbiAgICB0aGlzLnByZXZCdXR0b24gPSAkKGAuc3dpcGVyUHJldkJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLm5leHRCdXR0b24gPSAkKGAuc3dpcGVyTmV4dEJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLml0ZW1zID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5zd2lwZXItaXRlbScpO1xyXG5cclxuICAgIC8vY3VycmVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAvL2Z1bmN0aW9uc1xyXG4gICAgdGhpcy5uZXh0SW5kZXhBZGRBY3RpdmUgPSB0aGlzLm5leHRJbmRleEFkZEFjdGl2ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUgPSB0aGlzLnByZXZJbmRleEFkZEFjdGl2ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGF0dGFjaChzZWxlY3RvciA9ICcuc3dpcGVyLWNvbnRlbnQnKSB7XHJcbiAgICBsZXQgaW5zdGFuY2VzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIFtdLmZvckVhY2guY2FsbChlbGVtZW50cywgZWxlbWVudCA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGluc3RhbmNlcy5wdXNoKG5ldyBya1N3aXBlcihlbGVtZW50KSk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnN0YW5jZXM7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZWJ1dHRvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAkKHRoaXMucHJldkJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAkKHRoaXMubmV4dEJ1dHRvbikuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcblxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICAkKHRoaXMucHJldkJ1dHRvbikuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAkKHRoaXMubmV4dEJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dEluZGV4QWRkQWN0aXZlKCkge1xyXG4gIGlmICh0aGlzLmNvdW50ZXIgPCB0aGlzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICAgICQodGhpcy5pdGVtc1t0aGlzLmNvdW50ZXJdKS5hZGRDbGFzcygnaXMtYWN0aXZlJykucHJldigpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChgLmN1cnJlbnQtZGF5LmlzLWFjdGl2ZVtkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCkubmV4dCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICB0aGlzLnRvZ2dsZWJ1dHRvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZJbmRleEFkZEFjdGl2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuY291bnRlci0tO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLnByZXYoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBiaW5kRXZlbnRzKCkge1xyXG4gICAgJCh0aGlzLnByZXZCdXR0b24pLmNsaWNrKHRoaXMubmV4dEluZGV4QWRkQWN0aXZlKTtcclxuICAgICQodGhpcy5uZXh0QnV0dG9uKS5jbGljayh0aGlzLnByZXZJbmRleEFkZEFjdGl2ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRTd2lwZXIoKSB7XHJcbiAgdmFyIHN3aXBlcnMgPSBya1N3aXBlci5hdHRhY2goKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIFRhYnNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy9UT0RPOiB1c2UgZGF0YS1hdHRyaWJ1dGVzIHRvIGNyZWF0ZSB0YWIgZ3JvdXBzIHRvIHByZXZlbnQgdGFicyBmcm9tIGNvbmZsaWN0aW5nIGluIGNhc2Ugb2YgbXVsdGlwbGUgaW5zdGFuY2VzXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGFicygpIHtcclxuICAkKCcudGFiLXRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50Jyk7XHJcblxyXG4gICAgICAkKCcudGFiLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgIGlmICgkKCcjJyArIHRhYiApLmhhc0NsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJykpIHtcclxuICAgICAgICAkKCcuY29udGVudC10YWInKS5hZGRDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykuZGF0YSgndGFiLWNvbnRlbnQnKSk7XHJcbiAgICAgICAgJCgnIycgKyB0YWIgKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoJCgnIycgKyB0YWIgKS5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcclxuICAgICAgICAkKCcuY29udGVudC10YWInKS5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKS5kYXRhKCd0YWItY29udGVudCcpKTtcclxuICAgICAgICAkKCcjJyArIHRhYiApLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgfVxyXG5cclxuICB9KTtcclxufVxyXG4iXX0=
