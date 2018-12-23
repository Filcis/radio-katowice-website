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
      $(this.accordionLinks).not($(e.currentTarget)).siblings('.navbar-dropdown').slideUp(300).removeClass('is-active');
      ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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O0FBQ0Q7O0FBRUQsUUFBSSxDQUFDLENBQUMsTUFBRixHQUFDLENBQUQsQ0FBQSxRQUFBLENBQUosV0FBSSxDQUFKLEVBQXlDO0FBQ3ZDLE1BQUEsQ0FBQyxDQUFELGNBQUMsQ0FBRCxDQUFBLFFBQUEsQ0FBQSxXQUFBO0FBQ0EsTUFBQSxDQUFDLENBQUMsTUFBRixHQUFDLENBQUQsQ0FBQSxXQUFBLENBQUEsV0FBQTtBQUNEO0FBZEwsR0FBQTtBQWlCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vcHJpdmF0ZVxyXG5sZXQgZ29Ub1RvcEJ1dHRvbiA9ICQoJyNjLWdvLXRvcCcpO1xyXG5sZXQgZ29Ub1RvcCA9IChldmVudCk9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgIHNjcm9sbFRvcDogMFxyXG4gIH0sIDUwMCk7XHJcbn1cclxuXHJcbmxldCBkcm9wZG93biA9ICQoJy5uYXZiYXItbGluaycpO1xyXG5sZXQgc3VibWVudXMgPSAkKCcjbWFpbi1tZW51IC5uYXZiYXItZHJvcGRvd24nKTtcclxubGV0IGFjY29yZGlvbkxpbmsgPSAkKCcuYWNjb3JkaW9uLXRpdGxlJyk7XHJcbmxldCBhY2NvcmRpb25Db250ZW50ID0gJCgnLmFjY29yZGlvbi1jb250ZW50Jyk7XHJcbmxldCBzaG9ydGN1dHMgPSAkKCcucGxheWVyLXNob3J0Y3V0Jyk7XHJcbmxldCBwbGF5ZXJfYnV0dG9uID0gJCgnI3BsYXllci1idXR0b24tcGxheScpO1xyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGxheWVyIHBvcHVwXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxudmFyIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZSA9IG51bGw7XHJcbmZ1bmN0aW9uIHBsYXllclBvcHVwKCkge1xyXG4gICQoJy5idXR0b24uY2FsbC10by1hY3Rpb24sICNwbGF5ZXItbWFpbi1jYWxsLXRvLWFjdGlvbicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5SZXF1ZXN0ZWRQb3B1cCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5SZXF1ZXN0ZWRQb3B1cCh1cmwpIHtcclxuICBpZiAocmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID09IG51bGwgfHwgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlLmNsb3NlZCkge1xyXG4gICAgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gd2luZG93Lm9wZW4odXJsLCBcIlJLX1BsYXllclwiLCBcIndpZHRoPTM2MCxoZWlnaHQ9NjQwXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuZm9jdXMoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEFDQ09SRElPTlxyXG4vLyBmdW5jdGlvbiBkcm9wZG93blRvZ2dsZShsaW5rLCBlbGVtZW50KSB7XHJcbi8vICAgICBsaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4vLyAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4vLyAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhlbGVtZW50KS5zbGlkZURvd24oMzAwKTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhlbGVtZW50KS5zbGlkZVVwKDMwMCk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9KTtcclxuLy8gfVxyXG4vL1xyXG4vLyBmdW5jdGlvbiBkZXRhY2hOYXYobGluayl7XHJcbi8vICAgbGluay5vZmYoJ2NsaWNrJyk7XHJcbi8vIH1cclxuLy9cclxuLy8gZnVuY3Rpb24gcmVzcG9uc2l2ZU5hdigpIHtcclxuLy8gICBpZihNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6IDEwODdweCknKSkge1xyXG4vLyAgICAgZGV0YWNoTmF2KGRyb3Bkb3duKTtcclxuLy8gICAgIGRyb3Bkb3duVG9nZ2xlKGRyb3Bkb3duLCBzdWJtZW51cyk7XHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICAgIGRldGFjaE5hdihkcm9wZG93bik7XHJcbi8vICAgICAkKGRyb3Bkb3duKS5zaWJsaW5ncyhzdWJtZW51cykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVBsYXkoKSB7XHJcbiAgc2hvcnRjdXRzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBzaG9ydGN1dHMubm90KCQodGhpcykpLnJlbW92ZUNsYXNzKCdwbGF5Jyk7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdwbGF5Jyk7XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheWVyVG9nZ2xlUGxheSgpIHtcclxuICBwbGF5ZXJfYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdwbGF5aW5nJyk7XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGxldCBhdHRhY2hDbGlja0V2ZW50cyA9ICgpID0+IHtcclxuICBnb1RvVG9wQnV0dG9uLm9uKCdjbGljaycsIGdvVG9Ub3ApO1xyXG4gIC8vIHJlc3BvbnNpdmVOYXYoKVxyXG4gIC8vICQod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZSggcmVzcG9uc2l2ZU5hdiwgMTAwKSk7XHJcbiAgLy8gZHJvcGRvd25Ub2dnbGUoYWNjb3JkaW9uTGluaywgYWNjb3JkaW9uQ29udGVudCk7XHJcbiAgcGxheWVyVG9nZ2xlUGxheSgpO1xyXG4gIHRvZ2dsZVBsYXkoKTtcclxuICBwbGF5ZXJQb3B1cCgpO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuLypqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXHJcblxyXG5pbXBvcnQgeyBhdHRhY2hTY3JvbGxFdmVudHMgfSBmcm9tICcuL3Njcm9sbF9ldmVudHMuanMnO1xyXG5pbXBvcnQgeyBhdHRhY2hDbGlja0V2ZW50cyB9IGZyb20gJy4vY2xpY2tfZXZlbnRzLmpzJztcclxuaW1wb3J0IHsgcmVzcG9uc2l2ZVJlc2l6aW5nIH0gZnJvbSAnLi9tZWRpYV9zaXplLmpzJztcclxuaW1wb3J0ICogYXMgcmtVdGlsaXRpZXMgZnJvbSAnLi91dGlscy5qcydcclxuYXR0YWNoU2Nyb2xsRXZlbnRzKCk7XHJcbmF0dGFjaENsaWNrRXZlbnRzKCk7XHJcbnJlc3BvbnNpdmVSZXNpemluZygpO1xyXG5ya1V0aWxpdGllcy5idXJnZXJIYW5kbGVyKCk7XHJcbnJrVXRpbGl0aWVzLmF0dGFjaENhcm91c2VscygpO1xyXG5ya1V0aWxpdGllcy5hY2NvcmRpb25zKCk7XHJcbnJrVXRpbGl0aWVzLnRhYnMoKTtcclxucmtVdGlsaXRpZXMuY29udGVudFN3aXBlcigpO1xyXG4vL3Rlc3R5XHJcbiIsImNvbnN0IG1lZGlhU2l6ZSA9ICgpID0+IHtcclxuICAgICAgaWYoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiA2MDBweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTEnKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0yIGlzLTQnKTtcclxuICAgICAgfSBlbHNlIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogOTAwcHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy0yJyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMSBpcy00Jyk7XHJcbiAgICAgIH0gZWxzZSBpZihNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6IDEwODhweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTQnKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0xIGlzLTInKTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2l2ZVJlc2l6aW5nKCkge1xyXG4gIG1lZGlhU2l6ZSgpO1xyXG4gICQod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZSggbWVkaWFTaXplLCAxMDApKTtcclxufVxyXG4iLCIgIC8vcHJpdmF0ZVxyXG4gIGxldCBhZHNwYWNlID0gJCgnI3RvcC1hZGQnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICBsZXQgbmF2YmFyID0gJCgnI21haW4tbmF2Jyk7XHJcbiAgbGV0IHlvdXR1YmVMaXZlID0gJCgnI3NpZGViYXItZml4ZWRJZnJhbWUtd3JhcHBlcicpO1xyXG4gIGxldCB5b3V0dWJlTGl2ZVNjcm9sbFRvcCA9ICQoJyNzaWRlYmFyLWZpeGVkSWZyYW1lLXdyYXBwZXInKS5vZmZzZXQoKTtcclxuICBsZXQgZ29Ub1RvcCA9ICQoJyNjLWdvLXRvcCcpO1xyXG5cclxuICBmdW5jdGlvbiBmaXhOYXZiYXJPblNjcm9sbCgpIHtcclxuICAgIC8vYmV6IGRlYm91bmNlXHJcbiAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBpZiAod2luZG93U2Nyb2xsVG9wID49IGFkc3BhY2UpIHtcclxuICAgICAgICAgIG5hdmJhci5hZGRDbGFzcygnaXMtZml4ZWQtdG9wJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hhcy1uYXZiYXItZml4ZWQtdG9wJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkLXRvcCcpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoYXMtbmF2YmFyLWZpeGVkLXRvcCcpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaXhlZFZpZGVvKHdpbmRvd1Njcm9sbFRvcCkge1xyXG4gICAgaWYoeW91dHViZUxpdmUubGVuZ3RoICE9IDApIHtcclxuICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+PSB5b3V0dWJlTGl2ZVNjcm9sbFRvcC50b3ApIHtcclxuICAgICAgICAgIHlvdXR1YmVMaXZlLmFkZENsYXNzKCdmaXhlZC1wbGF5ZXInKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHlvdXR1YmVMaXZlLnJlbW92ZUNsYXNzKCdmaXhlZC1wbGF5ZXInKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9UaGVUb3Aod2luZG93U2Nyb2xsVG9wKSB7XHJcbiAgICBsZXQgb2Zmc2V0ID0gMTAwMDtcclxuICAgIHZhciBmYWRlRHVyYXRpb24gPSA1MDA7XHJcbiAgICBpZiAod2luZG93U2Nyb2xsVG9wID4gb2Zmc2V0KSB7XHJcbiAgICAgICAgZ29Ub1RvcC5mYWRlVG8oZmFkZUR1cmF0aW9uLCAwLjgpO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3dTY3JvbGxUb3AgPD0gb2Zmc2V0KSB7XHJcbiAgICAgICAgZ29Ub1RvcC5mYWRlT3V0KGZhZGVEdXJhdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlYm91bmNlZFNjcm9sbEV2ZW50cyAoKSB7XHJcbiAgICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIGZpeGVkVmlkZW8od2luZG93U2Nyb2xsVG9wKTtcclxuICAgICAgdG9UaGVUb3Aod2luZG93U2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoU2Nyb2xsRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIF8uZGVib3VuY2UoZGVib3VuY2VkU2Nyb2xsRXZlbnRzLCAyMDAsIHtsZWFkaW5nOiB0cnVlfSkpO1xyXG4gICAgICBmaXhOYXZiYXJPblNjcm9sbCgpOyAvL2ZpcmUgb25jZSBvbiBzdGFydFxyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZpeE5hdmJhck9uU2Nyb2xsKTtcclxuICB9XHJcbiIsIi8vIGNvbnN0IGRyb3Bkb3duID0gJCgnI3N0cmVhbS1kcm9wZG93bicpO1xyXG5sZXQgbmF2YmFyQnVyZ2VycyA9ICQoJy5uYXZiYXItYnVyZ2VyJyk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIEJ1cmdlciBNZW51XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVyZ2VySGFuZGxlcigpe1xyXG4gIG5hdmJhckJ1cmdlcnMub24oJ2NsaWNrJywoKGUpID0+IHtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBDYXJvdXNlbHNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaENhcm91c2VscygpIHtcclxuICB2YXIgY2Fyb3VzZWxzID0gYnVsbWFDYXJvdXNlbC5hdHRhY2goKTsgLy8gY2Fyb3VzZWxzIG5vdyBjb250YWlucyBhbiBhcnJheSBvZiBhbGwgQ2Fyb3VzZWwgaW5zdGFuY2VzXHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBOYXZpZ2F0aW9uXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5jbGFzcyBya0FjY29yZGlvbk1lbnUge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gJChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLmFjY29yZGlvbkxpbmtzID0gJCh0aGlzLmluc3RhbmNlKS5maW5kKCcuYWNjb3JkaW9uLXRpdGxlLCAubmF2YmFyLWxpbmsnKTtcclxuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhdHRhY2goc2VsZWN0b3IgPSAnLmFjY29yZGlvbiwgLm5hdmJhci1tZW51Jykge1xyXG4gICAgbGV0IGluc3RhbmNlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIFtdLmZvckVhY2guY2FsbChlbGVtZW50cywgZWxlbWVudCA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGluc3RhbmNlcy5wdXNoKG5ldyBya0FjY29yZGlvbk1lbnUoZWxlbWVudCkpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5zdGFuY2VzO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgICQodGhpcy5hY2NvcmRpb25MaW5rcykub24oJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAkKHRoaXMuYWNjb3JkaW9uTGlua3MpLnNpYmxpbmdzKCcubmF2YmFyLWRyb3Bkb3duJykuc2xpZGVVcCgzMDApO1xyXG4gICAgICAkKHRoaXMuYWNjb3JkaW9uTGlua3MpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5kbGVyKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAkKHRoaXMuYWNjb3JkaW9uTGlua3MpLm5vdCgkKGUuY3VycmVudFRhcmdldCkpLnNpYmxpbmdzKCcubmF2YmFyLWRyb3Bkb3duJykuc2xpZGVVcCgzMDApLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTs7XHJcbiAgICAkKGUuY3VycmVudFRhcmdldCkuc2libGluZ3MoJy5hY2NvcmRpb24tY29udGVudCwgLm5hdmJhci1kcm9wZG93bicpLnNsaWRlVG9nZ2xlKDMwMCk7XHJcbiAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjY29yZGlvbnMoKSB7XHJcbiAgdmFyIGFjY29yZGlvbnMgPSBya0FjY29yZGlvbk1lbnUuYXR0YWNoKCk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBTd2lwZXJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuY2xhc3MgcmtTd2lwZXIge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gJChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnNjb3BlID0gJCh0aGlzLmVsZW1lbnQpLmRhdGEoJ3Njb3BlJyk7XHJcbiAgICB0aGlzLnByZXZCdXR0b24gPSAkKGAuc3dpcGVyUHJldkJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLm5leHRCdXR0b24gPSAkKGAuc3dpcGVyTmV4dEJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLml0ZW1zID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5zd2lwZXItaXRlbScpO1xyXG5cclxuICAgIC8vY3VycmVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAvL2Z1bmN0aW9uc1xyXG4gICAgdGhpcy5uZXh0SW5kZXhBZGRBY3RpdmUgPSB0aGlzLm5leHRJbmRleEFkZEFjdGl2ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUgPSB0aGlzLnByZXZJbmRleEFkZEFjdGl2ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGF0dGFjaChzZWxlY3RvciA9ICcuc3dpcGVyLWNvbnRlbnQnKSB7XHJcbiAgICBsZXQgaW5zdGFuY2VzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIFtdLmZvckVhY2guY2FsbChlbGVtZW50cywgZWxlbWVudCA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGluc3RhbmNlcy5wdXNoKG5ldyBya1N3aXBlcihlbGVtZW50KSk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnN0YW5jZXM7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZWJ1dHRvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAkKHRoaXMucHJldkJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAkKHRoaXMubmV4dEJ1dHRvbikuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcblxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICAkKHRoaXMucHJldkJ1dHRvbikuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAkKHRoaXMubmV4dEJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dEluZGV4QWRkQWN0aXZlKCkge1xyXG4gIGlmICh0aGlzLmNvdW50ZXIgPCB0aGlzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICAgICQodGhpcy5pdGVtc1t0aGlzLmNvdW50ZXJdKS5hZGRDbGFzcygnaXMtYWN0aXZlJykucHJldigpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChgLmN1cnJlbnQtZGF5LmlzLWFjdGl2ZVtkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCkubmV4dCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICB0aGlzLnRvZ2dsZWJ1dHRvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZJbmRleEFkZEFjdGl2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuY291bnRlci0tO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLnByZXYoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBiaW5kRXZlbnRzKCkge1xyXG4gICAgJCh0aGlzLnByZXZCdXR0b24pLmNsaWNrKHRoaXMubmV4dEluZGV4QWRkQWN0aXZlKTtcclxuICAgICQodGhpcy5uZXh0QnV0dG9uKS5jbGljayh0aGlzLnByZXZJbmRleEFkZEFjdGl2ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRTd2lwZXIoKSB7XHJcbiAgdmFyIHN3aXBlcnMgPSBya1N3aXBlci5hdHRhY2goKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIFRhYnNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy9UT0RPOiB1c2UgZGF0YS1hdHRyaWJ1dGVzIHRvIGNyZWF0ZSB0YWIgZ3JvdXBzIHRvIHByZXZlbnQgdGFicyBmcm9tIGNvbmZsaWN0aW5nIGluIGNhc2Ugb2YgbXVsdGlwbGUgaW5zdGFuY2VzXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGFicygpIHtcclxuICAkKCcudGFiLXRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50Jyk7XHJcblxyXG4gICAgICAkKCcudGFiLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgIGlmICgkKCcjJyArIHRhYiApLmhhc0NsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJykpIHtcclxuICAgICAgICAkKCcuY29udGVudC10YWInKS5hZGRDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJyMnICsgdGFiICkuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcblxyXG4gIH0pO1xyXG59XHJcbiJdfQ==
