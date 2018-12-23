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

function detachNav(link) {
  link.off('click');
}

function responsiveNav() {
  if (Modernizr.mq('(max-width: 1087px)')) {
    detachNav(dropdown);
    initNav(dropdown, submenus);
  } else {
    detachNav(dropdown);
    $(dropdown).siblings(submenus).removeAttr('style');
  }
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
} // const dropdown = $('#stream-dropdown');


var navbarBurgers = $('.navbar-burger');
/* ==================================================
                    Dropdown
================================================== */
// export function dropdownHandler(){
//   dropdown.on('click', ((e) => {
//       $(e.currentTarget).toggleClass('is-active');
//       $(e.currentTarget.dataset.target).slideToggle("slow");
//   }));
// }

/* ==================================================
                   Burger Menu
================================================== */

function burgerHandler() {
  navbarBurgers.on('click', function (e) {
    $(e.currentTarget).toggleClass('is-active');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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NEIsWUFBVztBQUNuQyxRQUFJLEdBQUcsR0FBRyxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsSUFBQSxDQUFWLGFBQVUsQ0FBVjtBQUVBLElBQUEsQ0FBQyxDQUFELFlBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxXQUFBO0FBQ0EsSUFBQSxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsUUFBQSxDQUFBLFdBQUE7O0FBRUEsUUFBSSxDQUFDLENBQUMsTUFBRixHQUFDLENBQUQsQ0FBQSxRQUFBLENBQUosa0JBQUksQ0FBSixFQUFnRDtBQUM5QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsa0JBQUE7QUFDQSxNQUFBLE9BQU8sQ0FBUCxHQUFBLENBQVksQ0FBQyxDQUFELElBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBWixhQUFZLENBQVo7QUFDQSxNQUFBLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxrQkFBQTtBQUNEOztBQUVELFFBQUksQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsUUFBQSxDQUFKLFdBQUksQ0FBSixFQUF5QztBQUN2QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsV0FBQTtBQUNBLE1BQUEsT0FBTyxDQUFQLEdBQUEsQ0FBWSxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsSUFBQSxDQUFaLGFBQVksQ0FBWjtBQUNBLE1BQUEsQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsV0FBQSxDQUFBLFdBQUE7QUFDRDtBQWhCTCxHQUFBO0FBbUJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9wcml2YXRlXHJcbmxldCBnb1RvVG9wQnV0dG9uID0gJCgnI2MtZ28tdG9wJyk7XHJcbmxldCBnb1RvVG9wID0gKGV2ZW50KT0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgfSwgNTAwKTtcclxufVxyXG5cclxubGV0IGRyb3Bkb3duID0gJCgnLm5hdmJhci1saW5rJyk7XHJcbmxldCBzdWJtZW51cyA9ICQoJyNtYWluLW1lbnUgLm5hdmJhci1kcm9wZG93bicpO1xyXG5sZXQgYWNjb3JkaW9uTGluayA9ICQoJy5hY2NvcmRpb24tdGl0bGUnKTtcclxubGV0IGFjY29yZGlvbkNvbnRlbnQgPSAkKCcuYWNjb3JkaW9uLWNvbnRlbnQnKTtcclxubGV0IHNob3J0Y3V0cyA9ICQoJy5wbGF5ZXItc2hvcnRjdXQnKTtcclxubGV0IHBsYXllcl9idXR0b24gPSAkKCcjcGxheWVyLWJ1dHRvbi1wbGF5Jyk7XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQbGF5ZXIgcG9wdXBcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG52YXIgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gbnVsbDtcclxuZnVuY3Rpb24gcGxheWVyUG9wdXAoKSB7XHJcbiAgJCgnLmJ1dHRvbi5jYWxsLXRvLWFjdGlvbiwgI3BsYXllci1tYWluLWNhbGwtdG8tYWN0aW9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblJlcXVlc3RlZFBvcHVwKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJlcXVlc3RlZFBvcHVwKHVybCkge1xyXG4gIGlmIChya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPT0gbnVsbCB8fCBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuY2xvc2VkKSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPSB3aW5kb3cub3Blbih1cmwsIFwiUktfUGxheWVyXCIsIFwid2lkdGg9MzYwLGhlaWdodD02NDBcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG5cclxuLy9OQVZJR0FUSU9OXHJcbmZ1bmN0aW9uIGluaXROYXYobGluaywgZWxlbWVudCkge1xyXG4gICAgbGluay5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb3BlbicpKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhlbGVtZW50KS5zbGlkZURvd24oMzAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKGVsZW1lbnQpLnNsaWRlVXAoMzAwKTtcclxuICAgICAgfVxyXG4gICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGV0YWNoTmF2KGxpbmspe1xyXG4gIGxpbmsub2ZmKCdjbGljaycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNwb25zaXZlTmF2KCkge1xyXG4gIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogMTA4N3B4KScpKSB7XHJcbiAgICBkZXRhY2hOYXYoZHJvcGRvd24pO1xyXG4gICAgaW5pdE5hdihkcm9wZG93biwgc3VibWVudXMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkZXRhY2hOYXYoZHJvcGRvd24pO1xyXG4gICAgJChkcm9wZG93bikuc2libGluZ3Moc3VibWVudXMpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQbGF5KCkge1xyXG4gIHNob3J0Y3V0cy5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgc2hvcnRjdXRzLm5vdCgkKHRoaXMpKS5yZW1vdmVDbGFzcygncGxheScpO1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheScpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXllclRvZ2dsZVBsYXkoKSB7XHJcbiAgcGxheWVyX2J1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheWluZycpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoQ2xpY2tFdmVudHMgPSAoKSA9PiB7XHJcbiAgZ29Ub1RvcEJ1dHRvbi5vbignY2xpY2snLCBnb1RvVG9wKTtcclxuICByZXNwb25zaXZlTmF2KClcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoIHJlc3BvbnNpdmVOYXYsIDEwMCkpO1xyXG4gIGluaXROYXYoYWNjb3JkaW9uTGluaywgYWNjb3JkaW9uQ29udGVudCk7XHJcbiAgcGxheWVyVG9nZ2xlUGxheSgpO1xyXG4gIHRvZ2dsZVBsYXkoKTtcclxuICBwbGF5ZXJQb3B1cCgpO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuLypqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXHJcblxyXG5pbXBvcnQgeyBhdHRhY2hTY3JvbGxFdmVudHMgfSBmcm9tICcuL3Njcm9sbF9ldmVudHMuanMnO1xyXG5pbXBvcnQgeyBhdHRhY2hDbGlja0V2ZW50cyB9IGZyb20gJy4vY2xpY2tfZXZlbnRzLmpzJztcclxuaW1wb3J0IHsgcmVzcG9uc2l2ZVJlc2l6aW5nIH0gZnJvbSAnLi9tZWRpYV9zaXplLmpzJztcclxuaW1wb3J0ICogYXMgcmtVdGlsaXRpZXMgZnJvbSAnLi91dGlscy5qcydcclxuYXR0YWNoU2Nyb2xsRXZlbnRzKCk7XHJcbmF0dGFjaENsaWNrRXZlbnRzKCk7XHJcbnJlc3BvbnNpdmVSZXNpemluZygpO1xyXG5ya1V0aWxpdGllcy5idXJnZXJIYW5kbGVyKCk7XHJcbnJrVXRpbGl0aWVzLmF0dGFjaENhcm91c2VscygpO1xyXG5ya1V0aWxpdGllcy50YWJzKCk7XHJcbnJrVXRpbGl0aWVzLmNvbnRlbnRTd2lwZXIoKTtcclxuLy90ZXN0eVxyXG4iLCJjb25zdCBtZWRpYVNpemUgPSAoKSA9PiB7XHJcbiAgICAgIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogNjAwcHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy0xJyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMiBpcy00Jyk7XHJcbiAgICAgIH0gZWxzZSBpZihNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6IDkwMHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtMicpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTEgaXMtNCcpO1xyXG4gICAgICB9IGVsc2UgaWYoTW9kZXJuaXpyLm1xKCcobWluLXdpZHRoOiAxMDg4cHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy00Jyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMSBpcy0yJyk7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNpdmVSZXNpemluZygpIHtcclxuICBtZWRpYVNpemUoKTtcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoIG1lZGlhU2l6ZSwgMTAwKSk7XHJcbn1cclxuIiwiICAvL3ByaXZhdGVcclxuICBsZXQgYWRzcGFjZSA9ICQoJyN0b3AtYWRkJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgbGV0IG5hdmJhciA9ICQoJyNtYWluLW5hdicpO1xyXG4gIGxldCB5b3V0dWJlTGl2ZSA9ICQoJyNzaWRlYmFyLWZpeGVkSWZyYW1lLXdyYXBwZXInKTtcclxuICBsZXQgeW91dHViZUxpdmVTY3JvbGxUb3AgPSAkKCcjc2lkZWJhci1maXhlZElmcmFtZS13cmFwcGVyJykub2Zmc2V0KCk7XHJcbiAgbGV0IGdvVG9Ub3AgPSAkKCcjYy1nby10b3AnKTtcclxuXHJcbiAgZnVuY3Rpb24gZml4TmF2YmFyT25TY3JvbGwoKSB7XHJcbiAgICAvL2JleiBkZWJvdW5jZVxyXG4gICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+PSBhZHNwYWNlKSB7XHJcbiAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLWZpeGVkLXRvcCcpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoYXMtbmF2YmFyLWZpeGVkLXRvcCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy1maXhlZC10b3AnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLW5hdmJhci1maXhlZC10b3AnKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZml4ZWRWaWRlbyh3aW5kb3dTY3JvbGxUb3ApIHtcclxuICAgIGlmKHlvdXR1YmVMaXZlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPj0geW91dHViZUxpdmVTY3JvbGxUb3AudG9wKSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5hZGRDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5yZW1vdmVDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCkge1xyXG4gICAgbGV0IG9mZnNldCA9IDEwMDA7XHJcbiAgICB2YXIgZmFkZUR1cmF0aW9uID0gNTAwO1xyXG4gICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZVRvKGZhZGVEdXJhdGlvbiwgMC44KTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93U2Nyb2xsVG9wIDw9IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZU91dChmYWRlRHVyYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWJvdW5jZWRTY3JvbGxFdmVudHMgKCkge1xyXG4gICAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBmaXhlZFZpZGVvKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICAgIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgbGV0IGF0dGFjaFNjcm9sbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLmRlYm91bmNlKGRlYm91bmNlZFNjcm9sbEV2ZW50cywgMjAwLCB7bGVhZGluZzogdHJ1ZX0pKTtcclxuICAgICAgZml4TmF2YmFyT25TY3JvbGwoKTsgLy9maXJlIG9uY2Ugb24gc3RhcnRcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmaXhOYXZiYXJPblNjcm9sbCk7XHJcbiAgfVxyXG4iLCIvLyBjb25zdCBkcm9wZG93biA9ICQoJyNzdHJlYW0tZHJvcGRvd24nKTtcclxubGV0IG5hdmJhckJ1cmdlcnMgPSAkKCcubmF2YmFyLWJ1cmdlcicpO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgICBEcm9wZG93blxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gZHJvcGRvd25IYW5kbGVyKCl7XHJcbi8vICAgZHJvcGRvd24ub24oJ2NsaWNrJywgKChlKSA9PiB7XHJcbi8vICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbi8vICAgICAgICQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0KS5zbGlkZVRvZ2dsZShcInNsb3dcIik7XHJcbi8vICAgfSkpO1xyXG4vLyB9XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgQnVyZ2VyIE1lbnVcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidXJnZXJIYW5kbGVyKCl7XHJcbiAgbmF2YmFyQnVyZ2Vycy5vbignY2xpY2snLCgoZSkgPT4ge1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIENhcm91c2Vsc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoQ2Fyb3VzZWxzKCkge1xyXG4gIHZhciBjYXJvdXNlbHMgPSBidWxtYUNhcm91c2VsLmF0dGFjaCgpOyAvLyBjYXJvdXNlbHMgbm93IGNvbnRhaW5zIGFuIGFycmF5IG9mIGFsbCBDYXJvdXNlbCBpbnN0YW5jZXNcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIEFjY29yZGlvblxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLy8gY2xhc3MgcmtBY2NvcmRpb24ge1xyXG4vLyAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbi8vICAgICB0aGlzLmluc3RhbmNlID0gJChzZWxlY3Rvcik7XHJcbi8vICAgICB0aGlzLmFjY29yZGlvbkxpbmtzID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5hY2NvcmRpb24tdGl0bGUsIG5hdmJhci1saW5rJyk7XHJcbi8vICAgICB0aGlzLmluaXQoKTtcclxuLy8gICB9XHJcbi8vXHJcbi8vICAgc3RhdGljIGF0dGFjaChzZWxlY3RvciA9ICcuYWNjb3JkaW9uLCAubmF2YmFyLW1lbnUnKSB7XHJcbi8vICAgICBsZXQgaW5zdGFuY2VzID0gbmV3IEFycmF5KCk7XHJcbi8vICAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4vLyAgICAgW10uZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBlbGVtZW50ID0+IHtcclxuLy8gICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbi8vICAgICAgICAgaW5zdGFuY2VzLnB1c2gobmV3IHJrQWNjb3JkaW9uKGVsZW1lbnQpKTtcclxuLy8gICAgICAgfSwgMTAwKTtcclxuLy8gICAgIH0pO1xyXG4vLyAgICAgcmV0dXJuIGluc3RhbmNlcztcclxuLy8gICB9XHJcbi8vXHJcbi8vICAgaW5pdCgpIHtcclxuLy8gICAgIHRoaXMuYWNjb3JkaW9uTGlua3MuY2xpY2soKVxyXG4vLyAgICAgY29uc29sZS5sb2coXCJhY2NvcmRpb24gaW5pdGlhdGVkXCIpO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gfVxyXG4vL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gYWNjb3JkaW9ucygpIHtcclxuLy8gICB2YXIgYWNjb3JkaW9ucyA9IHJrQWNjb3JkaW9uLmF0dGFjaCgpO1xyXG4vLyB9XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgU3dpcGVyXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmNsYXNzIHJrU3dpcGVyIHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9ICQoc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5zY29wZSA9ICQodGhpcy5lbGVtZW50KS5kYXRhKCdzY29wZScpO1xyXG4gICAgdGhpcy5wcmV2QnV0dG9uID0gJChgLnN3aXBlclByZXZCdXR0b25bZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApO1xyXG4gICAgdGhpcy5uZXh0QnV0dG9uID0gJChgLnN3aXBlck5leHRCdXR0b25bZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApO1xyXG4gICAgdGhpcy5pdGVtcyA9ICQodGhpcy5lbGVtZW50KS5maW5kKCcuc3dpcGVyLWl0ZW0nKTtcclxuXHJcbiAgICAvL2N1cnJlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgLy9mdW5jdGlvbnNcclxuICAgIHRoaXMubmV4dEluZGV4QWRkQWN0aXZlID0gdGhpcy5uZXh0SW5kZXhBZGRBY3RpdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucHJldkluZGV4QWRkQWN0aXZlID0gdGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhdHRhY2goc2VsZWN0b3IgPSAnLnN3aXBlci1jb250ZW50Jykge1xyXG4gICAgbGV0IGluc3RhbmNlcyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgcmtTd2lwZXIoZWxlbWVudCkpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5zdGFuY2VzO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMudG9nZ2xlYnV0dG9ucygpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVidXR0b25zKCkge1xyXG4gICAgaWYgKHRoaXMuY291bnRlciA9PT0gMCkge1xyXG4gICAgICAgJCh0aGlzLnByZXZCdXR0b24pLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgJCh0aGlzLm5leHRCdXR0b24pLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xyXG5cclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgJCh0aGlzLnByZXZCdXR0b24pLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgJCh0aGlzLm5leHRCdXR0b24pLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xyXG4gICAgIH1cclxuICB9XHJcblxyXG4gIG5leHRJbmRleEFkZEFjdGl2ZSgpIHtcclxuICBpZiAodGhpcy5jb3VudGVyIDwgdGhpcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLm5leHQoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykucHJldigpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmV2SW5kZXhBZGRBY3RpdmUoKSB7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyID4gMCkge1xyXG4gICAgICB0aGlzLmNvdW50ZXItLTtcclxuICAgICAgJCh0aGlzLml0ZW1zW3RoaXMuY291bnRlcl0pLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKGAuY3VycmVudC1kYXkuaXMtYWN0aXZlW2RhdGEtc2NvcGU9JHt0aGlzLnNjb3BlfV1gKS5wcmV2KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgIHRoaXMudG9nZ2xlYnV0dG9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYmluZEV2ZW50cygpIHtcclxuICAgICQodGhpcy5wcmV2QnV0dG9uKS5jbGljayh0aGlzLm5leHRJbmRleEFkZEFjdGl2ZSk7XHJcbiAgICAkKHRoaXMubmV4dEJ1dHRvbikuY2xpY2sodGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50U3dpcGVyKCkge1xyXG4gIHZhciBzd2lwZXJzID0gcmtTd2lwZXIuYXR0YWNoKCk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBUYWJzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vVE9ETzogdXNlIGRhdGEtYXR0cmlidXRlcyB0byBjcmVhdGUgdGFiIGdyb3VwcyB0byBwcmV2ZW50IHRhYnMgZnJvbSBjb25mbGljdGluZyBpbiBjYXNlIG9mIG11bHRpcGxlIGluc3RhbmNlc1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRhYnMoKSB7XHJcbiAgJCgnLnRhYi10aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdGFiID0gJCh0aGlzKS5kYXRhKCd0YWItY29udGVudCcpO1xyXG5cclxuICAgICAgJCgnLnRhYi10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICBpZiAoJCgnIycgKyB0YWIgKS5oYXNDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50JykpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJyMnICsgdGFiICkuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykuZGF0YSgndGFiLWNvbnRlbnQnKSk7XHJcbiAgICAgICAgJCgnIycgKyB0YWIgKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgfSk7XHJcbn1cclxuIl19
