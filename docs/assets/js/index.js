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
      $(this.accordionLinks).siblings().on('click', function (e) {
        e.stopPropagation();
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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SixFQUFnRDtBQUM5QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsa0JBQUE7QUFDQSxNQUFBLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxrQkFBQTtBQUNEOztBQUVELFFBQUksQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsUUFBQSxDQUFKLFdBQUksQ0FBSixFQUF5QztBQUN2QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsV0FBQTtBQUNBLE1BQUEsQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsV0FBQSxDQUFBLFdBQUE7QUFDRDtBQWRMLEdBQUE7QUFpQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL3ByaXZhdGVcclxubGV0IGdvVG9Ub3BCdXR0b24gPSAkKCcjYy1nby10b3AnKTtcclxubGV0IGdvVG9Ub3AgPSAoZXZlbnQpPT4ge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICBzY3JvbGxUb3A6IDBcclxuICB9LCA1MDApO1xyXG59XHJcblxyXG5sZXQgZHJvcGRvd24gPSAkKCcubmF2YmFyLWxpbmsnKTtcclxubGV0IHN1Ym1lbnVzID0gJCgnI21haW4tbWVudSAubmF2YmFyLWRyb3Bkb3duJyk7XHJcbmxldCBhY2NvcmRpb25MaW5rID0gJCgnLmFjY29yZGlvbi10aXRsZScpO1xyXG5sZXQgYWNjb3JkaW9uQ29udGVudCA9ICQoJy5hY2NvcmRpb24tY29udGVudCcpO1xyXG5sZXQgc2hvcnRjdXRzID0gJCgnLnBsYXllci1zaG9ydGN1dCcpO1xyXG5sZXQgcGxheWVyX2J1dHRvbiA9ICQoJyNwbGF5ZXItYnV0dG9uLXBsYXknKTtcclxuXHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFBsYXllciBwb3B1cFxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbnZhciBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPSBudWxsO1xyXG5mdW5jdGlvbiBwbGF5ZXJQb3B1cCgpIHtcclxuICAkKCcuYnV0dG9uLmNhbGwtdG8tYWN0aW9uLCAjcGxheWVyLW1haW4tY2FsbC10by1hY3Rpb24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuUmVxdWVzdGVkUG9wdXAoJCh0aGlzKS5hdHRyKCdocmVmJykpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUmVxdWVzdGVkUG9wdXAodXJsKSB7XHJcbiAgaWYgKHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZSA9PSBudWxsIHx8IHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZS5jbG9zZWQpIHtcclxuICAgIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZSA9IHdpbmRvdy5vcGVuKHVybCwgXCJSS19QbGF5ZXJcIiwgXCJ3aWR0aD0zNjAsaGVpZ2h0PTY0MFwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlLmZvY3VzKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBBQ0NPUkRJT05cclxuLy8gZnVuY3Rpb24gZHJvcGRvd25Ub2dnbGUobGluaywgZWxlbWVudCkge1xyXG4vLyAgICAgbGluay5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuLy8gICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuLy8gICAgICAgICAgICQodGhpcykuc2libGluZ3MoZWxlbWVudCkuc2xpZGVEb3duKDMwMCk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICQodGhpcykuc2libGluZ3MoZWxlbWVudCkuc2xpZGVVcCgzMDApO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfSk7XHJcbi8vIH1cclxuLy9cclxuLy8gZnVuY3Rpb24gZGV0YWNoTmF2KGxpbmspe1xyXG4vLyAgIGxpbmsub2ZmKCdjbGljaycpO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIHJlc3BvbnNpdmVOYXYoKSB7XHJcbi8vICAgaWYoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAxMDg3cHgpJykpIHtcclxuLy8gICAgIGRldGFjaE5hdihkcm9wZG93bik7XHJcbi8vICAgICBkcm9wZG93blRvZ2dsZShkcm9wZG93biwgc3VibWVudXMpO1xyXG4vLyAgIH0gZWxzZSB7XHJcbi8vICAgICBkZXRhY2hOYXYoZHJvcGRvd24pO1xyXG4vLyAgICAgJChkcm9wZG93bikuc2libGluZ3Moc3VibWVudXMpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQbGF5KCkge1xyXG4gIHNob3J0Y3V0cy5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgc2hvcnRjdXRzLm5vdCgkKHRoaXMpKS5yZW1vdmVDbGFzcygncGxheScpO1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheScpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXllclRvZ2dsZVBsYXkoKSB7XHJcbiAgcGxheWVyX2J1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheWluZycpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoQ2xpY2tFdmVudHMgPSAoKSA9PiB7XHJcbiAgZ29Ub1RvcEJ1dHRvbi5vbignY2xpY2snLCBnb1RvVG9wKTtcclxuICAvLyByZXNwb25zaXZlTmF2KClcclxuICAvLyAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoIHJlc3BvbnNpdmVOYXYsIDEwMCkpO1xyXG4gIC8vIGRyb3Bkb3duVG9nZ2xlKGFjY29yZGlvbkxpbmssIGFjY29yZGlvbkNvbnRlbnQpO1xyXG4gIHBsYXllclRvZ2dsZVBsYXkoKTtcclxuICB0b2dnbGVQbGF5KCk7XHJcbiAgcGxheWVyUG9wdXAoKTtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcbi8qanNoaW50IGVzdmVyc2lvbjogNiAqL1xyXG5cclxuaW1wb3J0IHsgYXR0YWNoU2Nyb2xsRXZlbnRzIH0gZnJvbSAnLi9zY3JvbGxfZXZlbnRzLmpzJztcclxuaW1wb3J0IHsgYXR0YWNoQ2xpY2tFdmVudHMgfSBmcm9tICcuL2NsaWNrX2V2ZW50cy5qcyc7XHJcbmltcG9ydCB7IHJlc3BvbnNpdmVSZXNpemluZyB9IGZyb20gJy4vbWVkaWFfc2l6ZS5qcyc7XHJcbmltcG9ydCAqIGFzIHJrVXRpbGl0aWVzIGZyb20gJy4vdXRpbHMuanMnXHJcbmF0dGFjaFNjcm9sbEV2ZW50cygpO1xyXG5hdHRhY2hDbGlja0V2ZW50cygpO1xyXG5yZXNwb25zaXZlUmVzaXppbmcoKTtcclxucmtVdGlsaXRpZXMuYnVyZ2VySGFuZGxlcigpO1xyXG5ya1V0aWxpdGllcy5hdHRhY2hDYXJvdXNlbHMoKTtcclxucmtVdGlsaXRpZXMuYWNjb3JkaW9ucygpO1xyXG5ya1V0aWxpdGllcy50YWJzKCk7XHJcbnJrVXRpbGl0aWVzLmNvbnRlbnRTd2lwZXIoKTtcclxuLy90ZXN0eVxyXG4iLCJjb25zdCBtZWRpYVNpemUgPSAoKSA9PiB7XHJcbiAgICAgIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogNjAwcHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy0xJyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMiBpcy00Jyk7XHJcbiAgICAgIH0gZWxzZSBpZihNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6IDkwMHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtMicpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTEgaXMtNCcpO1xyXG4gICAgICB9IGVsc2UgaWYoTW9kZXJuaXpyLm1xKCcobWluLXdpZHRoOiAxMDg4cHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy00Jyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMSBpcy0yJyk7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNpdmVSZXNpemluZygpIHtcclxuICBtZWRpYVNpemUoKTtcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoIG1lZGlhU2l6ZSwgMTAwKSk7XHJcbn1cclxuIiwiICAvL3ByaXZhdGVcclxuICBsZXQgYWRzcGFjZSA9ICQoJyN0b3AtYWRkJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgbGV0IG5hdmJhciA9ICQoJyNtYWluLW5hdicpO1xyXG4gIGxldCB5b3V0dWJlTGl2ZSA9ICQoJyNzaWRlYmFyLWZpeGVkSWZyYW1lLXdyYXBwZXInKTtcclxuICBsZXQgeW91dHViZUxpdmVTY3JvbGxUb3AgPSAkKCcjc2lkZWJhci1maXhlZElmcmFtZS13cmFwcGVyJykub2Zmc2V0KCk7XHJcbiAgbGV0IGdvVG9Ub3AgPSAkKCcjYy1nby10b3AnKTtcclxuXHJcbiAgZnVuY3Rpb24gZml4TmF2YmFyT25TY3JvbGwoKSB7XHJcbiAgICAvL2JleiBkZWJvdW5jZVxyXG4gICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+PSBhZHNwYWNlKSB7XHJcbiAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLWZpeGVkLXRvcCcpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoYXMtbmF2YmFyLWZpeGVkLXRvcCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy1maXhlZC10b3AnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLW5hdmJhci1maXhlZC10b3AnKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZml4ZWRWaWRlbyh3aW5kb3dTY3JvbGxUb3ApIHtcclxuICAgIGlmKHlvdXR1YmVMaXZlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPj0geW91dHViZUxpdmVTY3JvbGxUb3AudG9wKSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5hZGRDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5yZW1vdmVDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCkge1xyXG4gICAgbGV0IG9mZnNldCA9IDEwMDA7XHJcbiAgICB2YXIgZmFkZUR1cmF0aW9uID0gNTAwO1xyXG4gICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZVRvKGZhZGVEdXJhdGlvbiwgMC44KTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93U2Nyb2xsVG9wIDw9IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZU91dChmYWRlRHVyYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWJvdW5jZWRTY3JvbGxFdmVudHMgKCkge1xyXG4gICAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBmaXhlZFZpZGVvKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICAgIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgbGV0IGF0dGFjaFNjcm9sbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLmRlYm91bmNlKGRlYm91bmNlZFNjcm9sbEV2ZW50cywgMjAwLCB7bGVhZGluZzogdHJ1ZX0pKTtcclxuICAgICAgZml4TmF2YmFyT25TY3JvbGwoKTsgLy9maXJlIG9uY2Ugb24gc3RhcnRcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmaXhOYXZiYXJPblNjcm9sbCk7XHJcbiAgfVxyXG4iLCIvLyBjb25zdCBkcm9wZG93biA9ICQoJyNzdHJlYW0tZHJvcGRvd24nKTtcclxubGV0IG5hdmJhckJ1cmdlcnMgPSAkKCcubmF2YmFyLWJ1cmdlcicpO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBCdXJnZXIgTWVudVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1cmdlckhhbmRsZXIoKXtcclxuICBuYXZiYXJCdXJnZXJzLm9uKCdjbGljaycsKChlKSA9PiB7XHJcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgQ2Fyb3VzZWxzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hDYXJvdXNlbHMoKSB7XHJcbiAgdmFyIGNhcm91c2VscyA9IGJ1bG1hQ2Fyb3VzZWwuYXR0YWNoKCk7IC8vIGNhcm91c2VscyBub3cgY29udGFpbnMgYW4gYXJyYXkgb2YgYWxsIENhcm91c2VsIGluc3RhbmNlc1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgTmF2aWdhdGlvblxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuY2xhc3MgcmtBY2NvcmRpb25NZW51IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9ICQoc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5hY2NvcmRpb25MaW5rcyA9ICQodGhpcy5pbnN0YW5jZSkuZmluZCgnLmFjY29yZGlvbi10aXRsZSwgLm5hdmJhci1saW5rJyk7XHJcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXR0YWNoKHNlbGVjdG9yID0gJy5hY2NvcmRpb24sIC5uYXZiYXItbWVudScpIHtcclxuICAgIGxldCBpbnN0YW5jZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgcmtBY2NvcmRpb25NZW51KGVsZW1lbnQpKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGluc3RhbmNlcztcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICAkKHRoaXMuYWNjb3JkaW9uTGlua3MpLm9uKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcclxuICAgICQodGhpcy5hY2NvcmRpb25MaW5rcykuc2libGluZ3MoKS5vbignY2xpY2snLCAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgJCh0aGlzLmFjY29yZGlvbkxpbmtzKS5zaWJsaW5ncygnLm5hdmJhci1kcm9wZG93bicpLnNsaWRlVXAoMzAwKTtcclxuICAgICAgJCh0aGlzLmFjY29yZGlvbkxpbmtzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsaWNrSGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgJCh0aGlzLmFjY29yZGlvbkxpbmtzKS5ub3QoJChlLmN1cnJlbnRUYXJnZXQpKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJykuc2libGluZ3MoJy5uYXZiYXItZHJvcGRvd24nKS5zbGlkZVVwKDMwMCk7XHJcbiAgICAkKGUuY3VycmVudFRhcmdldCkuc2libGluZ3MoJy5hY2NvcmRpb24tY29udGVudCwgLm5hdmJhci1kcm9wZG93bicpLnNsaWRlVG9nZ2xlKDMwMCk7XHJcbiAgICAkKGUuY3VycmVudFRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjY29yZGlvbnMoKSB7XHJcbiAgdmFyIGFjY29yZGlvbnMgPSBya0FjY29yZGlvbk1lbnUuYXR0YWNoKCk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBTd2lwZXJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuY2xhc3MgcmtTd2lwZXIge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gJChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnNjb3BlID0gJCh0aGlzLmVsZW1lbnQpLmRhdGEoJ3Njb3BlJyk7XHJcbiAgICB0aGlzLnByZXZCdXR0b24gPSAkKGAuc3dpcGVyUHJldkJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLm5leHRCdXR0b24gPSAkKGAuc3dpcGVyTmV4dEJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLml0ZW1zID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5zd2lwZXItaXRlbScpO1xyXG5cclxuICAgIC8vY3VycmVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAvL2Z1bmN0aW9uc1xyXG4gICAgdGhpcy5uZXh0SW5kZXhBZGRBY3RpdmUgPSB0aGlzLm5leHRJbmRleEFkZEFjdGl2ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5wcmV2SW5kZXhBZGRBY3RpdmUgPSB0aGlzLnByZXZJbmRleEFkZEFjdGl2ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGF0dGFjaChzZWxlY3RvciA9ICcuc3dpcGVyLWNvbnRlbnQnKSB7XHJcbiAgICBsZXQgaW5zdGFuY2VzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIFtdLmZvckVhY2guY2FsbChlbGVtZW50cywgZWxlbWVudCA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGluc3RhbmNlcy5wdXNoKG5ldyBya1N3aXBlcihlbGVtZW50KSk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnN0YW5jZXM7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZWJ1dHRvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAkKHRoaXMucHJldkJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAkKHRoaXMubmV4dEJ1dHRvbikuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcblxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICAkKHRoaXMucHJldkJ1dHRvbikuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAkKHRoaXMubmV4dEJ1dHRvbikucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dEluZGV4QWRkQWN0aXZlKCkge1xyXG4gIGlmICh0aGlzLmNvdW50ZXIgPCB0aGlzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICAgICQodGhpcy5pdGVtc1t0aGlzLmNvdW50ZXJdKS5hZGRDbGFzcygnaXMtYWN0aXZlJykucHJldigpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChgLmN1cnJlbnQtZGF5LmlzLWFjdGl2ZVtkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCkubmV4dCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICB0aGlzLnRvZ2dsZWJ1dHRvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZJbmRleEFkZEFjdGl2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuY291bnRlci0tO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLnByZXYoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBiaW5kRXZlbnRzKCkge1xyXG4gICAgJCh0aGlzLnByZXZCdXR0b24pLmNsaWNrKHRoaXMubmV4dEluZGV4QWRkQWN0aXZlKTtcclxuICAgICQodGhpcy5uZXh0QnV0dG9uKS5jbGljayh0aGlzLnByZXZJbmRleEFkZEFjdGl2ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRTd2lwZXIoKSB7XHJcbiAgdmFyIHN3aXBlcnMgPSBya1N3aXBlci5hdHRhY2goKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIFRhYnNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy9UT0RPOiB1c2UgZGF0YS1hdHRyaWJ1dGVzIHRvIGNyZWF0ZSB0YWIgZ3JvdXBzIHRvIHByZXZlbnQgdGFicyBmcm9tIGNvbmZsaWN0aW5nIGluIGNhc2Ugb2YgbXVsdGlwbGUgaW5zdGFuY2VzXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGFicygpIHtcclxuICAkKCcudGFiLXRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50Jyk7XHJcblxyXG4gICAgICAkKCcudGFiLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgIGlmICgkKCcjJyArIHRhYiApLmhhc0NsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJykpIHtcclxuICAgICAgICAkKCcuY29udGVudC10YWInKS5hZGRDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJyMnICsgdGFiICkuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcblxyXG4gIH0pO1xyXG59XHJcbiJdfQ==
