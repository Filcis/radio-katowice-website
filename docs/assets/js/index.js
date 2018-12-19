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
    $(this).siblings(element).toggleClass('open');
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

var attachClickEvents = function attachClickEvents() {
  goToTopButton.on('click', goToTop);
  initNav(dropdown, submenus);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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QyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsUUFBQSxDQUFKLFdBQUksQ0FBSixFQUF5QztBQUN2QyxNQUFBLENBQUMsQ0FBRCxjQUFDLENBQUQsQ0FBQSxRQUFBLENBQUEsV0FBQTtBQUNBLE1BQUEsT0FBTyxDQUFQLEdBQUEsQ0FBWSxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsSUFBQSxDQUFaLGFBQVksQ0FBWjtBQUNBLE1BQUEsQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsV0FBQSxDQUFBLFdBQUE7QUFDRDtBQWhCTCxHQUFBO0FBbUJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9wcml2YXRlXHJcbmxldCBnb1RvVG9wQnV0dG9uID0gJCgnI2MtZ28tdG9wJyk7XHJcbmxldCBnb1RvVG9wID0gKGV2ZW50KT0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgfSwgNTAwKTtcclxufVxyXG5cclxubGV0IGRyb3Bkb3duID0gJCgnLm5hdmJhci1saW5rJyk7XHJcbmxldCBzdWJtZW51cyA9ICQoJyNtYWluLW1lbnUgLm5hdmJhci1kcm9wZG93bicpO1xyXG5sZXQgYWNjb3JkaW9uTGluayA9ICQoJy5hY2NvcmRpb24tdGl0bGUnKTtcclxubGV0IGFjY29yZGlvbkNvbnRlbnQgPSAkKCcuYWNjb3JkaW9uLWNvbnRlbnQnKTtcclxubGV0IHNob3J0Y3V0cyA9ICQoJy5wbGF5ZXItc2hvcnRjdXQnKTtcclxubGV0IHBsYXllcl9idXR0b24gPSAkKCcjcGxheWVyLWJ1dHRvbi1wbGF5Jyk7XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQbGF5ZXIgcG9wdXBcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG52YXIgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gbnVsbDtcclxuZnVuY3Rpb24gcGxheWVyUG9wdXAoKSB7XHJcbiAgJCgnLmJ1dHRvbi5jYWxsLXRvLWFjdGlvbiwgI3BsYXllci1tYWluLWNhbGwtdG8tYWN0aW9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblJlcXVlc3RlZFBvcHVwKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJlcXVlc3RlZFBvcHVwKHVybCkge1xyXG4gIGlmIChya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPT0gbnVsbCB8fCBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuY2xvc2VkKSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPSB3aW5kb3cub3Blbih1cmwsIFwiUktfUGxheWVyXCIsIFwid2lkdGg9MzYwLGhlaWdodD02NDBcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG5cclxuLy9OQVZJR0FUSU9OXHJcbmZ1bmN0aW9uIGluaXROYXYobGluaywgZWxlbWVudCkge1xyXG4gICAgbGluay5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKGVsZW1lbnQpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQbGF5KCkge1xyXG4gIHNob3J0Y3V0cy5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgc2hvcnRjdXRzLm5vdCgkKHRoaXMpKS5yZW1vdmVDbGFzcygncGxheScpO1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheScpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXllclRvZ2dsZVBsYXkoKSB7XHJcbiAgcGxheWVyX2J1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheWluZycpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoQ2xpY2tFdmVudHMgPSAoKSA9PiB7XHJcbiAgZ29Ub1RvcEJ1dHRvbi5vbignY2xpY2snLCBnb1RvVG9wKTtcclxuICBpbml0TmF2KGRyb3Bkb3duLCBzdWJtZW51cyk7XHJcbiAgaW5pdE5hdihhY2NvcmRpb25MaW5rLCBhY2NvcmRpb25Db250ZW50KTtcclxuICBwbGF5ZXJUb2dnbGVQbGF5KCk7XHJcbiAgdG9nZ2xlUGxheSgpO1xyXG4gIHBsYXllclBvcHVwKCk7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG4vKmpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuXHJcbmltcG9ydCB7IGF0dGFjaFNjcm9sbEV2ZW50cyB9IGZyb20gJy4vc2Nyb2xsX2V2ZW50cy5qcyc7XHJcbmltcG9ydCB7IGF0dGFjaENsaWNrRXZlbnRzIH0gZnJvbSAnLi9jbGlja19ldmVudHMuanMnO1xyXG5pbXBvcnQgeyByZXNwb25zaXZlUmVzaXppbmcgfSBmcm9tICcuL21lZGlhX3NpemUuanMnO1xyXG5pbXBvcnQgKiBhcyBya1V0aWxpdGllcyBmcm9tICcuL3V0aWxzLmpzJ1xyXG5hdHRhY2hTY3JvbGxFdmVudHMoKTtcclxuYXR0YWNoQ2xpY2tFdmVudHMoKTtcclxucmVzcG9uc2l2ZVJlc2l6aW5nKCk7XHJcbnJrVXRpbGl0aWVzLmRyb3Bkb3duSGFuZGxlcigpO1xyXG5ya1V0aWxpdGllcy5idXJnZXJIYW5kbGVyKCk7XHJcbnJrVXRpbGl0aWVzLmF0dGFjaENhcm91c2VscygpO1xyXG5ya1V0aWxpdGllcy50YWJzKCk7XHJcbnJrVXRpbGl0aWVzLmNvbnRlbnRTd2lwZXIoKTtcclxuLy90ZXN0eVxyXG4iLCJjb25zdCBtZWRpYVNpemUgPSAoKSA9PiB7XHJcbiAgICAgIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogNjAwcHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy0xJyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMiBpcy00Jyk7XHJcbiAgICAgIH0gZWxzZSBpZihNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6IDkwMHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtMicpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTEgaXMtNCcpO1xyXG4gICAgICB9IGVsc2UgaWYoTW9kZXJuaXpyLm1xKCcobWluLXdpZHRoOiAxMDg4cHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy00Jyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMSBpcy0yJyk7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNpdmVSZXNpemluZygpIHtcclxuICBtZWRpYVNpemUoKTtcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoIG1lZGlhU2l6ZSwgMTAwKSk7XHJcbn1cclxuIiwiICAvL3ByaXZhdGVcclxuICBsZXQgYWRzcGFjZSA9ICQoJyN0b3AtYWRkJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgbGV0IG5hdmJhciA9ICQoJyNtYWluLW5hdicpO1xyXG4gIGxldCB5b3V0dWJlTGl2ZSA9ICQoJyNzaWRlYmFyLWZpeGVkSWZyYW1lLXdyYXBwZXInKTtcclxuICBsZXQgeW91dHViZUxpdmVTY3JvbGxUb3AgPSAkKCcjc2lkZWJhci1maXhlZElmcmFtZS13cmFwcGVyJykub2Zmc2V0KCk7XHJcbiAgbGV0IGdvVG9Ub3AgPSAkKCcjYy1nby10b3AnKTtcclxuXHJcbiAgZnVuY3Rpb24gZml4TmF2YmFyT25TY3JvbGwoKSB7XHJcbiAgICAvL2JleiBkZWJvdW5jZVxyXG4gICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+PSBhZHNwYWNlKSB7XHJcbiAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLWZpeGVkLXRvcCcpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoYXMtbmF2YmFyLWZpeGVkLXRvcCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy1maXhlZC10b3AnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLW5hdmJhci1maXhlZC10b3AnKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZml4ZWRWaWRlbyh3aW5kb3dTY3JvbGxUb3ApIHtcclxuICAgIGlmKHlvdXR1YmVMaXZlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPj0geW91dHViZUxpdmVTY3JvbGxUb3AudG9wKSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5hZGRDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5yZW1vdmVDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCkge1xyXG4gICAgbGV0IG9mZnNldCA9IDEwMDA7XHJcbiAgICB2YXIgZmFkZUR1cmF0aW9uID0gNTAwO1xyXG4gICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZVRvKGZhZGVEdXJhdGlvbiwgMC44KTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93U2Nyb2xsVG9wIDw9IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZU91dChmYWRlRHVyYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWJvdW5jZWRTY3JvbGxFdmVudHMgKCkge1xyXG4gICAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBmaXhlZFZpZGVvKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICAgIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgbGV0IGF0dGFjaFNjcm9sbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLmRlYm91bmNlKGRlYm91bmNlZFNjcm9sbEV2ZW50cywgMjAwLCB7bGVhZGluZzogdHJ1ZX0pKTtcclxuICAgICAgZml4TmF2YmFyT25TY3JvbGwoKTsgLy9maXJlIG9uY2Ugb24gc3RhcnRcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmaXhOYXZiYXJPblNjcm9sbCk7XHJcbiAgfVxyXG4iLCJjb25zdCBkcm9wZG93biA9ICQoJyNzdHJlYW0tZHJvcGRvd24nKTtcclxuY29uc3QgbmF2YmFyQnVyZ2VycyA9ICQoJy5uYXZiYXItYnVyZ2VyJyk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgIERyb3Bkb3duXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcm9wZG93bkhhbmRsZXIoKXtcclxuICBkcm9wZG93bi5vbignY2xpY2snLCAoKGUpID0+IHtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBCdXJnZXIgTWVudVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVyZ2VySGFuZGxlcigpe1xyXG4gIG5hdmJhckJ1cmdlcnMub24oJ2NsaWNrJywoKGUpID0+IHtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQpO1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIENhcm91c2Vsc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoQ2Fyb3VzZWxzKCkge1xyXG4gIHZhciBjYXJvdXNlbHMgPSBidWxtYUNhcm91c2VsLmF0dGFjaCgpOyAvLyBjYXJvdXNlbHMgbm93IGNvbnRhaW5zIGFuIGFycmF5IG9mIGFsbCBDYXJvdXNlbCBpbnN0YW5jZXNcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIFN3aXBlclxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5jbGFzcyBya1N3aXBlciB7XHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSAkKHNlbGVjdG9yKTtcclxuICAgIHRoaXMuc2NvcGUgPSAkKHRoaXMuZWxlbWVudCkuZGF0YSgnc2NvcGUnKTtcclxuICAgIHRoaXMucHJldkJ1dHRvbiA9ICQoYC5zd2lwZXJQcmV2QnV0dG9uW2RhdGEtc2NvcGU9JHt0aGlzLnNjb3BlfV1gKTtcclxuICAgIHRoaXMubmV4dEJ1dHRvbiA9ICQoYC5zd2lwZXJOZXh0QnV0dG9uW2RhdGEtc2NvcGU9JHt0aGlzLnNjb3BlfV1gKTtcclxuICAgIHRoaXMuaXRlbXMgPSAkKHRoaXMuZWxlbWVudCkuZmluZCgnLnN3aXBlci1pdGVtJyk7XHJcblxyXG4gICAgLy9jdXJyZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG5cclxuICAgIC8vZnVuY3Rpb25zXHJcbiAgICB0aGlzLm5leHRJbmRleEFkZEFjdGl2ZSA9IHRoaXMubmV4dEluZGV4QWRkQWN0aXZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnByZXZJbmRleEFkZEFjdGl2ZSA9IHRoaXMucHJldkluZGV4QWRkQWN0aXZlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXR0YWNoKHNlbGVjdG9yID0gJy5zd2lwZXItY29udGVudCcpIHtcclxuICAgIGxldCBpbnN0YW5jZXMgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgW10uZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBlbGVtZW50ID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaW5zdGFuY2VzLnB1c2gobmV3IHJrU3dpcGVyKGVsZW1lbnQpKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGluc3RhbmNlcztcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLnRvZ2dsZWJ1dHRvbnMoKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlYnV0dG9ucygpIHtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICQodGhpcy5wcmV2QnV0dG9uKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgICAgICQodGhpcy5uZXh0QnV0dG9uKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgICQodGhpcy5wcmV2QnV0dG9uKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgICAgICQodGhpcy5uZXh0QnV0dG9uKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0SW5kZXhBZGRBY3RpdmUoKSB7XHJcbiAgaWYgKHRoaXMuY291bnRlciA8IHRoaXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLmNvdW50ZXIrKztcclxuICAgICAgJCh0aGlzLml0ZW1zW3RoaXMuY291bnRlcl0pLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAkKGAuY3VycmVudC1kYXkuaXMtYWN0aXZlW2RhdGEtc2NvcGU9JHt0aGlzLnNjb3BlfV1gKS5uZXh0KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgIHRoaXMudG9nZ2xlYnV0dG9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJldkluZGV4QWRkQWN0aXZlKCkge1xyXG4gICAgaWYgKHRoaXMuY291bnRlciA+IDApIHtcclxuICAgICAgdGhpcy5jb3VudGVyLS07XHJcbiAgICAgICQodGhpcy5pdGVtc1t0aGlzLmNvdW50ZXJdKS5hZGRDbGFzcygnaXMtYWN0aXZlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChgLmN1cnJlbnQtZGF5LmlzLWFjdGl2ZVtkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCkucHJldigpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICB0aGlzLnRvZ2dsZWJ1dHRvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJpbmRFdmVudHMoKSB7XHJcbiAgICAkKHRoaXMucHJldkJ1dHRvbikuY2xpY2sodGhpcy5uZXh0SW5kZXhBZGRBY3RpdmUpO1xyXG4gICAgJCh0aGlzLm5leHRCdXR0b24pLmNsaWNrKHRoaXMucHJldkluZGV4QWRkQWN0aXZlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udGVudFN3aXBlcigpIHtcclxuICB2YXIgc3dpcGVycyA9IHJrU3dpcGVyLmF0dGFjaCgpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgVGFic1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vL1RPRE86IHVzZSBkYXRhLWF0dHJpYnV0ZXMgdG8gY3JlYXRlIHRhYiBncm91cHMgdG8gcHJldmVudCB0YWJzIGZyb20gY29uZmxpY3RpbmcgaW4gY2FzZSBvZiBtdWx0aXBsZSBpbnN0YW5jZXNcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWJzKCkge1xyXG4gICQoJy50YWItdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHRhYiA9ICQodGhpcykuZGF0YSgndGFiLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICQoJy50YWItdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgaWYgKCQoJyMnICsgdGFiICkuaGFzQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKSkge1xyXG4gICAgICAgICQoJy5jb250ZW50LXRhYicpLmFkZENsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKS5kYXRhKCd0YWItY29udGVudCcpKTtcclxuICAgICAgICAkKCcjJyArIHRhYiApLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkKCcjJyArIHRhYiApLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xyXG4gICAgICAgICQoJy5jb250ZW50LXRhYicpLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50JykpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcblxyXG4gIH0pO1xyXG59XHJcbiJdfQ==
