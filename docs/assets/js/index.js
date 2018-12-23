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
} // ACCORDION
// function dropdownToggle(link, element) {
//     link.on('click', function() {
//         $(this).toggleClass('is-active');
//         if ($(this).hasClass('is-active')) {
//           $(this).siblings(element).slideDown(300);
//         } else {
//           $(this).siblings(element).slideUp(300);
//         }
//       });
// }
//
// function detachNav(link){
//   link.off('click');
// }
//
// function responsiveNav() {
//   if(Modernizr.mq('(max-width: 1087px)')) {
//     detachNav(dropdown);
//     dropdownToggle(dropdown, submenus);
//   } else {
//     detachNav(dropdown);
//     $(dropdown).siblings(submenus).removeAttr('style');
//   }
// }


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
  goToTopButton.on('click', goToTop); // responsiveNav()
  // $(window).on('resize', _.debounce( responsiveNav, 100));
  // dropdownToggle(accordionLink, accordionContent);

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
rkUtilities.accordions();
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
exports.accordions = accordions;
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
                   Navigation
================================================== */


var rkAccordionMenu =
/*#__PURE__*/
function () {
  function rkAccordionMenu(selector) {
    _classCallCheck(this, rkAccordionMenu);

    this.instance = $(selector);
    this.accordionLinks = $(this.instance).find('.accordion-title, .navbar-link');
    this.clickHandler = this.clickHandler.bind(this);
    this.init();
  }

  _createClass(rkAccordionMenu, [{
    key: "init",
    value: function init() {
      var _this = this;

      $(this.accordionLinks).on('click', this.clickHandler);
      $(document).on('click', function () {
        $(_this.accordionLinks).siblings('.navbar-dropdown').slideUp(300);
        $(_this.accordionLinks).removeClass('is-active');
      });
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      e.stopPropagation();
      $(this.accordionLinks).not($(e.currentTarget)).removeClass('is-active').siblings('.navbar-dropdown').slideUp(300);
      $(e.currentTarget).siblings('.accordion-content, .navbar-dropdown').slideToggle(300);
      $(e.currentTarget).toggleClass('is-active');
    }
  }], [{
    key: "attach",
    value: function attach() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.accordion, .navbar-menu';
      var instances = new Array();
      var elements = document.querySelectorAll(selector);
      [].forEach.call(elements, function (element) {
        setTimeout(function () {
          instances.push(new rkAccordionMenu(element));
        }, 100);
      });
      return instances;
    }
  }]);

  return rkAccordionMenu;
}();

function accordions() {
  var accordions = rkAccordionMenu.attach();
}
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
      $('#' + tab).removeClass('is-hidden-mobile');
    }

    if ($('#' + tab).hasClass('is-hidden')) {
      $('.content-tab').addClass('is-hidden');
      $('#' + tab).removeClass('is-hidden');
    }
  });
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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QUFFRCxRQUFJLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFFBQUEsQ0FBSixXQUFJLENBQUosRUFBeUM7QUFDdkMsTUFBQSxDQUFDLENBQUQsY0FBQyxDQUFELENBQUEsUUFBQSxDQUFBLFdBQUE7QUFDQSxNQUFBLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxXQUFBO0FBQ0Q7QUFkTCxHQUFBO0FBaUJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9wcml2YXRlXHJcbmxldCBnb1RvVG9wQnV0dG9uID0gJCgnI2MtZ28tdG9wJyk7XHJcbmxldCBnb1RvVG9wID0gKGV2ZW50KT0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgfSwgNTAwKTtcclxufVxyXG5cclxubGV0IGRyb3Bkb3duID0gJCgnLm5hdmJhci1saW5rJyk7XHJcbmxldCBzdWJtZW51cyA9ICQoJyNtYWluLW1lbnUgLm5hdmJhci1kcm9wZG93bicpO1xyXG5sZXQgYWNjb3JkaW9uTGluayA9ICQoJy5hY2NvcmRpb24tdGl0bGUnKTtcclxubGV0IGFjY29yZGlvbkNvbnRlbnQgPSAkKCcuYWNjb3JkaW9uLWNvbnRlbnQnKTtcclxubGV0IHNob3J0Y3V0cyA9ICQoJy5wbGF5ZXItc2hvcnRjdXQnKTtcclxubGV0IHBsYXllcl9idXR0b24gPSAkKCcjcGxheWVyLWJ1dHRvbi1wbGF5Jyk7XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQbGF5ZXIgcG9wdXBcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG52YXIgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gbnVsbDtcclxuZnVuY3Rpb24gcGxheWVyUG9wdXAoKSB7XHJcbiAgJCgnLmJ1dHRvbi5jYWxsLXRvLWFjdGlvbiwgI3BsYXllci1tYWluLWNhbGwtdG8tYWN0aW9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblJlcXVlc3RlZFBvcHVwKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJlcXVlc3RlZFBvcHVwKHVybCkge1xyXG4gIGlmIChya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPT0gbnVsbCB8fCBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuY2xvc2VkKSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPSB3aW5kb3cub3Blbih1cmwsIFwiUktfUGxheWVyXCIsIFwid2lkdGg9MzYwLGhlaWdodD02NDBcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQUNDT1JESU9OXHJcbi8vIGZ1bmN0aW9uIGRyb3Bkb3duVG9nZ2xlKGxpbmssIGVsZW1lbnQpIHtcclxuLy8gICAgIGxpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbi8vICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcbi8vICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKGVsZW1lbnQpLnNsaWRlRG93bigzMDApO1xyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKGVsZW1lbnQpLnNsaWRlVXAoMzAwKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIGRldGFjaE5hdihsaW5rKXtcclxuLy8gICBsaW5rLm9mZignY2xpY2snKTtcclxuLy8gfVxyXG4vL1xyXG4vLyBmdW5jdGlvbiByZXNwb25zaXZlTmF2KCkge1xyXG4vLyAgIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogMTA4N3B4KScpKSB7XHJcbi8vICAgICBkZXRhY2hOYXYoZHJvcGRvd24pO1xyXG4vLyAgICAgZHJvcGRvd25Ub2dnbGUoZHJvcGRvd24sIHN1Ym1lbnVzKTtcclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgICAgZGV0YWNoTmF2KGRyb3Bkb3duKTtcclxuLy8gICAgICQoZHJvcGRvd24pLnNpYmxpbmdzKHN1Ym1lbnVzKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUGxheSgpIHtcclxuICBzaG9ydGN1dHMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHNob3J0Y3V0cy5ub3QoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoJ3BsYXknKTtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3BsYXknKTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5ZXJUb2dnbGVQbGF5KCkge1xyXG4gIHBsYXllcl9idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3BsYXlpbmcnKTtcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGF0dGFjaENsaWNrRXZlbnRzID0gKCkgPT4ge1xyXG4gIGdvVG9Ub3BCdXR0b24ub24oJ2NsaWNrJywgZ29Ub1RvcCk7XHJcbiAgLy8gcmVzcG9uc2l2ZU5hdigpXHJcbiAgLy8gJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKCByZXNwb25zaXZlTmF2LCAxMDApKTtcclxuICAvLyBkcm9wZG93blRvZ2dsZShhY2NvcmRpb25MaW5rLCBhY2NvcmRpb25Db250ZW50KTtcclxuICBwbGF5ZXJUb2dnbGVQbGF5KCk7XHJcbiAgdG9nZ2xlUGxheSgpO1xyXG4gIHBsYXllclBvcHVwKCk7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG4vKmpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuXHJcbmltcG9ydCB7IGF0dGFjaFNjcm9sbEV2ZW50cyB9IGZyb20gJy4vc2Nyb2xsX2V2ZW50cy5qcyc7XHJcbmltcG9ydCB7IGF0dGFjaENsaWNrRXZlbnRzIH0gZnJvbSAnLi9jbGlja19ldmVudHMuanMnO1xyXG5pbXBvcnQgeyByZXNwb25zaXZlUmVzaXppbmcgfSBmcm9tICcuL21lZGlhX3NpemUuanMnO1xyXG5pbXBvcnQgKiBhcyBya1V0aWxpdGllcyBmcm9tICcuL3V0aWxzLmpzJ1xyXG5hdHRhY2hTY3JvbGxFdmVudHMoKTtcclxuYXR0YWNoQ2xpY2tFdmVudHMoKTtcclxucmVzcG9uc2l2ZVJlc2l6aW5nKCk7XHJcbnJrVXRpbGl0aWVzLmJ1cmdlckhhbmRsZXIoKTtcclxucmtVdGlsaXRpZXMuYXR0YWNoQ2Fyb3VzZWxzKCk7XHJcbnJrVXRpbGl0aWVzLmFjY29yZGlvbnMoKTtcclxucmtVdGlsaXRpZXMudGFicygpO1xyXG5ya1V0aWxpdGllcy5jb250ZW50U3dpcGVyKCk7XHJcbi8vdGVzdHlcclxuIiwiY29uc3QgbWVkaWFTaXplID0gKCkgPT4ge1xyXG4gICAgICBpZihNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6IDYwMHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtMScpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTIgaXMtNCcpO1xyXG4gICAgICB9IGVsc2UgaWYoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiA5MDBweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTInKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0xIGlzLTQnKTtcclxuICAgICAgfSBlbHNlIGlmKE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDogMTA4OHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtNCcpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTEgaXMtMicpO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zaXZlUmVzaXppbmcoKSB7XHJcbiAgbWVkaWFTaXplKCk7XHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKCBtZWRpYVNpemUsIDEwMCkpO1xyXG59XHJcbiIsIiAgLy9wcml2YXRlXHJcbiAgbGV0IGFkc3BhY2UgPSAkKCcjdG9wLWFkZCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gIGxldCBuYXZiYXIgPSAkKCcjbWFpbi1uYXYnKTtcclxuICBsZXQgeW91dHViZUxpdmUgPSAkKCcjc2lkZWJhci1maXhlZElmcmFtZS13cmFwcGVyJyk7XHJcbiAgbGV0IHlvdXR1YmVMaXZlU2Nyb2xsVG9wID0gJCgnI3NpZGViYXItZml4ZWRJZnJhbWUtd3JhcHBlcicpLm9mZnNldCgpO1xyXG4gIGxldCBnb1RvVG9wID0gJCgnI2MtZ28tdG9wJyk7XHJcblxyXG4gIGZ1bmN0aW9uIGZpeE5hdmJhck9uU2Nyb2xsKCkge1xyXG4gICAgLy9iZXogZGVib3VuY2VcclxuICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPj0gYWRzcGFjZSkge1xyXG4gICAgICAgICAgbmF2YmFyLmFkZENsYXNzKCdpcy1maXhlZC10b3AnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLW5hdmJhci1maXhlZC10b3AnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5hdmJhci5yZW1vdmVDbGFzcygnaXMtZml4ZWQtdG9wJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hhcy1uYXZiYXItZml4ZWQtdG9wJyk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZpeGVkVmlkZW8od2luZG93U2Nyb2xsVG9wKSB7XHJcbiAgICBpZih5b3V0dWJlTGl2ZS5sZW5ndGggIT0gMCkge1xyXG4gICAgICBpZiAod2luZG93U2Nyb2xsVG9wID49IHlvdXR1YmVMaXZlU2Nyb2xsVG9wLnRvcCkge1xyXG4gICAgICAgICAgeW91dHViZUxpdmUuYWRkQ2xhc3MoJ2ZpeGVkLXBsYXllcicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeW91dHViZUxpdmUucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXBsYXllcicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b1RoZVRvcCh3aW5kb3dTY3JvbGxUb3ApIHtcclxuICAgIGxldCBvZmZzZXQgPSAxMDAwO1xyXG4gICAgdmFyIGZhZGVEdXJhdGlvbiA9IDUwMDtcclxuICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPiBvZmZzZXQpIHtcclxuICAgICAgICBnb1RvVG9wLmZhZGVUbyhmYWRlRHVyYXRpb24sIDAuOCk7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvd1Njcm9sbFRvcCA8PSBvZmZzZXQpIHtcclxuICAgICAgICBnb1RvVG9wLmZhZGVPdXQoZmFkZUR1cmF0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVib3VuY2VkU2Nyb2xsRXZlbnRzICgpIHtcclxuICAgICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgZml4ZWRWaWRlbyh3aW5kb3dTY3JvbGxUb3ApO1xyXG4gICAgICB0b1RoZVRvcCh3aW5kb3dTY3JvbGxUb3ApO1xyXG4gICAgfVxyXG5cclxuZXhwb3J0IGxldCBhdHRhY2hTY3JvbGxFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgXy5kZWJvdW5jZShkZWJvdW5jZWRTY3JvbGxFdmVudHMsIDIwMCwge2xlYWRpbmc6IHRydWV9KSk7XHJcbiAgICAgIGZpeE5hdmJhck9uU2Nyb2xsKCk7IC8vZmlyZSBvbmNlIG9uIHN0YXJ0XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZml4TmF2YmFyT25TY3JvbGwpO1xyXG4gIH1cclxuIiwiLy8gY29uc3QgZHJvcGRvd24gPSAkKCcjc3RyZWFtLWRyb3Bkb3duJyk7XHJcbmxldCBuYXZiYXJCdXJnZXJzID0gJCgnLm5hdmJhci1idXJnZXInKTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgQnVyZ2VyIE1lbnVcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidXJnZXJIYW5kbGVyKCl7XHJcbiAgbmF2YmFyQnVyZ2Vycy5vbignY2xpY2snLCgoZSkgPT4ge1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIENhcm91c2Vsc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoQ2Fyb3VzZWxzKCkge1xyXG4gIHZhciBjYXJvdXNlbHMgPSBidWxtYUNhcm91c2VsLmF0dGFjaCgpOyAvLyBjYXJvdXNlbHMgbm93IGNvbnRhaW5zIGFuIGFycmF5IG9mIGFsbCBDYXJvdXNlbCBpbnN0YW5jZXNcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIE5hdmlnYXRpb25cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmNsYXNzIHJrQWNjb3JkaW9uTWVudSB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSAkKHNlbGVjdG9yKTtcclxuICAgIHRoaXMuYWNjb3JkaW9uTGlua3MgPSAkKHRoaXMuaW5zdGFuY2UpLmZpbmQoJy5hY2NvcmRpb24tdGl0bGUsIC5uYXZiYXItbGluaycpO1xyXG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGF0dGFjaChzZWxlY3RvciA9ICcuYWNjb3JkaW9uLCAubmF2YmFyLW1lbnUnKSB7XHJcbiAgICBsZXQgaW5zdGFuY2VzID0gbmV3IEFycmF5KCk7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgW10uZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBlbGVtZW50ID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaW5zdGFuY2VzLnB1c2gobmV3IHJrQWNjb3JkaW9uTWVudShlbGVtZW50KSk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnN0YW5jZXM7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgJCh0aGlzLmFjY29yZGlvbkxpbmtzKS5vbignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICQodGhpcy5hY2NvcmRpb25MaW5rcykuc2libGluZ3MoJy5uYXZiYXItZHJvcGRvd24nKS5zbGlkZVVwKDMwMCk7XHJcbiAgICAgICQodGhpcy5hY2NvcmRpb25MaW5rcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGlja0hhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICQodGhpcy5hY2NvcmRpb25MaW5rcykubm90KCQoZS5jdXJyZW50VGFyZ2V0KSkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpLnNpYmxpbmdzKCcubmF2YmFyLWRyb3Bkb3duJykuc2xpZGVVcCgzMDApO1xyXG4gICAgJChlLmN1cnJlbnRUYXJnZXQpLnNpYmxpbmdzKCcuYWNjb3JkaW9uLWNvbnRlbnQsIC5uYXZiYXItZHJvcGRvd24nKS5zbGlkZVRvZ2dsZSgzMDApO1xyXG4gICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY2NvcmRpb25zKCkge1xyXG4gIHZhciBhY2NvcmRpb25zID0gcmtBY2NvcmRpb25NZW51LmF0dGFjaCgpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgU3dpcGVyXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmNsYXNzIHJrU3dpcGVyIHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG5cclxuICAgIHRoaXMuZWxlbWVudCA9ICQoc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5zY29wZSA9ICQodGhpcy5lbGVtZW50KS5kYXRhKCdzY29wZScpO1xyXG4gICAgdGhpcy5wcmV2QnV0dG9uID0gJChgLnN3aXBlclByZXZCdXR0b25bZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApO1xyXG4gICAgdGhpcy5uZXh0QnV0dG9uID0gJChgLnN3aXBlck5leHRCdXR0b25bZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApO1xyXG4gICAgdGhpcy5pdGVtcyA9ICQodGhpcy5lbGVtZW50KS5maW5kKCcuc3dpcGVyLWl0ZW0nKTtcclxuXHJcbiAgICAvL2N1cnJlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgLy9mdW5jdGlvbnNcclxuICAgIHRoaXMubmV4dEluZGV4QWRkQWN0aXZlID0gdGhpcy5uZXh0SW5kZXhBZGRBY3RpdmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucHJldkluZGV4QWRkQWN0aXZlID0gdGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhdHRhY2goc2VsZWN0b3IgPSAnLnN3aXBlci1jb250ZW50Jykge1xyXG4gICAgbGV0IGluc3RhbmNlcyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgcmtTd2lwZXIoZWxlbWVudCkpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5zdGFuY2VzO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMudG9nZ2xlYnV0dG9ucygpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVidXR0b25zKCkge1xyXG4gICAgaWYgKHRoaXMuY291bnRlciA9PT0gMCkge1xyXG4gICAgICAgJCh0aGlzLnByZXZCdXR0b24pLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgJCh0aGlzLm5leHRCdXR0b24pLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xyXG5cclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgJCh0aGlzLnByZXZCdXR0b24pLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgJCh0aGlzLm5leHRCdXR0b24pLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xyXG4gICAgIH1cclxuICB9XHJcblxyXG4gIG5leHRJbmRleEFkZEFjdGl2ZSgpIHtcclxuICBpZiAodGhpcy5jb3VudGVyIDwgdGhpcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLm5leHQoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykucHJldigpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmV2SW5kZXhBZGRBY3RpdmUoKSB7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyID4gMCkge1xyXG4gICAgICB0aGlzLmNvdW50ZXItLTtcclxuICAgICAgJCh0aGlzLml0ZW1zW3RoaXMuY291bnRlcl0pLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKGAuY3VycmVudC1kYXkuaXMtYWN0aXZlW2RhdGEtc2NvcGU9JHt0aGlzLnNjb3BlfV1gKS5wcmV2KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgIHRoaXMudG9nZ2xlYnV0dG9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYmluZEV2ZW50cygpIHtcclxuICAgICQodGhpcy5wcmV2QnV0dG9uKS5jbGljayh0aGlzLm5leHRJbmRleEFkZEFjdGl2ZSk7XHJcbiAgICAkKHRoaXMubmV4dEJ1dHRvbikuY2xpY2sodGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50U3dpcGVyKCkge1xyXG4gIHZhciBzd2lwZXJzID0gcmtTd2lwZXIuYXR0YWNoKCk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBUYWJzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vVE9ETzogdXNlIGRhdGEtYXR0cmlidXRlcyB0byBjcmVhdGUgdGFiIGdyb3VwcyB0byBwcmV2ZW50IHRhYnMgZnJvbSBjb25mbGljdGluZyBpbiBjYXNlIG9mIG11bHRpcGxlIGluc3RhbmNlc1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRhYnMoKSB7XHJcbiAgJCgnLnRhYi10aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdGFiID0gJCh0aGlzKS5kYXRhKCd0YWItY29udGVudCcpO1xyXG5cclxuICAgICAgJCgnLnRhYi10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICBpZiAoJCgnIycgKyB0YWIgKS5oYXNDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgICAkKCcjJyArIHRhYiApLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkKCcjJyArIHRhYiApLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xyXG4gICAgICAgICQoJy5jb250ZW50LXRhYicpLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAkKCcjJyArIHRhYiApLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgfVxyXG5cclxuICB9KTtcclxufVxyXG4iXX0=
