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
    goToTop.fadeIn(fadeDuration);
  } else {
    goToTop.fadeOut(fadeDuration);
  }
}

function debouncedScrollEvents() {
  var windowScrollTop = $(window).scrollTop();
  fixNavbarOnScroll(windowScrollTop);
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

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.init();
  }

  _createClass(rkSwiper, [{
    key: "init",
    value: function init() {
      console.log('current item index');
      console.log(this.counter);
      console.log('length');
      console.log(this.length);
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
    key: "prev",
    value: function prev() {
      if (this.counter < this.length - 1) {
        this.counter += 1;
        $(this.items[this.counter]).addClass('is-active').prev().removeClass('is-active');
        $(".current-day.is-active[data-scope=".concat(this.scope, "]")).next().addClass('is-active').prev().removeClass('is-active');
        this.togglebuttons();
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (this.counter > 0) {
        this.counter -= 1;
        $(this.items[this.counter]).addClass('is-active').next().removeClass('is-active');
        $(".current-day.is-active[data-scope=".concat(this.scope, "]")).prev().addClass('is-active').next().removeClass('is-active');
        this.togglebuttons();
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      $(this.prevButton).click(this.prev);
      $(this.nextButton).click(this.next);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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TUFBQSxPQUFPLENBQVAsR0FBQSxDQUFZLENBQUMsQ0FBRCxJQUFDLENBQUQsQ0FBQSxJQUFBLENBQVosYUFBWSxDQUFaO0FBQ0EsTUFBQSxDQUFDLENBQUMsTUFBRixHQUFDLENBQUQsQ0FBQSxXQUFBLENBQUEsa0JBQUE7QUFDRDs7QUFFRCxRQUFJLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFFBQUEsQ0FBSixXQUFJLENBQUosRUFBeUM7QUFDdkMsTUFBQSxDQUFDLENBQUQsY0FBQyxDQUFELENBQUEsUUFBQSxDQUFBLFdBQUE7QUFDQSxNQUFBLE9BQU8sQ0FBUCxHQUFBLENBQVksQ0FBQyxDQUFELElBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBWixhQUFZLENBQVo7QUFDQSxNQUFBLENBQUMsQ0FBQyxNQUFGLEdBQUMsQ0FBRCxDQUFBLFdBQUEsQ0FBQSxXQUFBO0FBQ0Q7QUFoQkwsR0FBQTtBQW1CRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vcHJpdmF0ZVxyXG5sZXQgZ29Ub1RvcEJ1dHRvbiA9ICQoJyNjLWdvLXRvcCcpO1xyXG5sZXQgZ29Ub1RvcCA9IChldmVudCk9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgIHNjcm9sbFRvcDogMFxyXG4gIH0sIDUwMCk7XHJcbn1cclxuXHJcbmxldCBkcm9wZG93biA9ICQoJy5uYXZiYXItbGluaycpO1xyXG5sZXQgc3VibWVudXMgPSAkKCcjbWFpbi1tZW51IC5uYXZiYXItZHJvcGRvd24nKTtcclxubGV0IGFjY29yZGlvbkxpbmsgPSAkKCcuYWNjb3JkaW9uLXRpdGxlJyk7XHJcbmxldCBhY2NvcmRpb25Db250ZW50ID0gJCgnLmFjY29yZGlvbi1jb250ZW50Jyk7XHJcbmxldCBzaG9ydGN1dHMgPSAkKCcucGxheWVyLXNob3J0Y3V0Jyk7XHJcbmxldCBwbGF5ZXJfYnV0dG9uID0gJCgnI3BsYXllci1idXR0b24tcGxheScpO1xyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGxheWVyIHBvcHVwXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxudmFyIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZSA9IG51bGw7XHJcbmZ1bmN0aW9uIHBsYXllclBvcHVwKCkge1xyXG4gICQoJy5idXR0b24uY2FsbC10by1hY3Rpb24sICNwbGF5ZXItbWFpbi1jYWxsLXRvLWFjdGlvbicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5SZXF1ZXN0ZWRQb3B1cCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5SZXF1ZXN0ZWRQb3B1cCh1cmwpIHtcclxuICBpZiAocmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID09IG51bGwgfHwgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlLmNsb3NlZCkge1xyXG4gICAgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gd2luZG93Lm9wZW4odXJsLCBcIlJLX1BsYXllclwiLCBcIndpZHRoPTM2MCxoZWlnaHQ9NjQwXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuZm9jdXMoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vTkFWSUdBVElPTlxyXG5mdW5jdGlvbiBpbml0TmF2KGxpbmssIGVsZW1lbnQpIHtcclxuICAgIGxpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhlbGVtZW50KS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUGxheSgpIHtcclxuICBzaG9ydGN1dHMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHNob3J0Y3V0cy5ub3QoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoJ3BsYXknKTtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3BsYXknKTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5ZXJUb2dnbGVQbGF5KCkge1xyXG4gIHBsYXllcl9idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3BsYXlpbmcnKTtcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGF0dGFjaENsaWNrRXZlbnRzID0gKCkgPT4ge1xyXG4gIGdvVG9Ub3BCdXR0b24ub24oJ2NsaWNrJywgZ29Ub1RvcCk7XHJcbiAgaW5pdE5hdihkcm9wZG93biwgc3VibWVudXMpO1xyXG4gIGluaXROYXYoYWNjb3JkaW9uTGluaywgYWNjb3JkaW9uQ29udGVudCk7XHJcbiAgcGxheWVyVG9nZ2xlUGxheSgpO1xyXG4gIHRvZ2dsZVBsYXkoKTtcclxuICBwbGF5ZXJQb3B1cCgpO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0Jztcbi8qanNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5pbXBvcnQgeyBhdHRhY2hTY3JvbGxFdmVudHMgfSBmcm9tICcuL3Njcm9sbF9ldmVudHMuanMnO1xuaW1wb3J0IHsgYXR0YWNoQ2xpY2tFdmVudHMgfSBmcm9tICcuL2NsaWNrX2V2ZW50cy5qcyc7XG5pbXBvcnQgeyByZXNwb25zaXZlUmVzaXppbmcgfSBmcm9tICcuL21lZGlhX3NpemUuanMnO1xuaW1wb3J0ICogYXMgcmtVdGlsaXRpZXMgZnJvbSAnLi91dGlscy5qcydcbmF0dGFjaFNjcm9sbEV2ZW50cygpO1xuYXR0YWNoQ2xpY2tFdmVudHMoKTtcbnJlc3BvbnNpdmVSZXNpemluZygpO1xucmtVdGlsaXRpZXMuZHJvcGRvd25IYW5kbGVyKCk7XG5ya1V0aWxpdGllcy5idXJnZXJIYW5kbGVyKCk7XG5ya1V0aWxpdGllcy5hdHRhY2hDYXJvdXNlbHMoKTtcbnJrVXRpbGl0aWVzLnRhYnMoKTtcbnJrVXRpbGl0aWVzLmNvbnRlbnRTd2lwZXIoKTtcbi8vdGVzdHlcbiIsImNvbnN0IG1lZGlhU2l6ZSA9ICgpID0+IHtcclxuICAgICAgaWYoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiA2MDBweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTEnKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0yIGlzLTQnKTtcclxuICAgICAgfSBlbHNlIGlmKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogOTAwcHgpJykpIHtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLmFkZENsYXNzKCdpcy0yJyk7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnaXMtMSBpcy00Jyk7XHJcbiAgICAgIH0gZWxzZSBpZihNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6IDEwODhweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTQnKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0xIGlzLTInKTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2l2ZVJlc2l6aW5nKCkge1xyXG4gIG1lZGlhU2l6ZSgpO1xyXG4gICQod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZSggbWVkaWFTaXplLCAxMDApKTtcclxufVxyXG4iLCIgIC8vcHJpdmF0ZVxyXG4gIGxldCBhZHNwYWNlID0gJCgnI3RvcC1hZGQnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICBsZXQgbmF2YmFyID0gJCgnI21haW4tbmF2Jyk7XHJcbiAgbGV0IHlvdXR1YmVMaXZlID0gJCgnI3NpZGViYXItZml4ZWRJZnJhbWUtd3JhcHBlcicpO1xyXG4gIGxldCB5b3V0dWJlTGl2ZVNjcm9sbFRvcCA9ICQoJyNzaWRlYmFyLWZpeGVkSWZyYW1lLXdyYXBwZXInKS5vZmZzZXQoKTtcclxuICBsZXQgZ29Ub1RvcCA9ICQoJyNjLWdvLXRvcCcpO1xyXG5cclxuICBmdW5jdGlvbiBmaXhOYXZiYXJPblNjcm9sbCgpIHtcclxuICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPj0gYWRzcGFjZSkge1xyXG4gICAgICAgICAgbmF2YmFyLmFkZENsYXNzKCdpcy1maXhlZC10b3AnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLW5hdmJhci1maXhlZC10b3AnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5hdmJhci5yZW1vdmVDbGFzcygnaXMtZml4ZWQtdG9wJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hhcy1uYXZiYXItZml4ZWQtdG9wJyk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZpeGVkVmlkZW8od2luZG93U2Nyb2xsVG9wKSB7XHJcbiAgICBpZih5b3V0dWJlTGl2ZS5sZW5ndGggIT0gMCkge1xyXG4gICAgICBpZiAod2luZG93U2Nyb2xsVG9wID49IHlvdXR1YmVMaXZlU2Nyb2xsVG9wLnRvcCkge1xyXG4gICAgICAgICAgeW91dHViZUxpdmUuYWRkQ2xhc3MoJ2ZpeGVkLXBsYXllcicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeW91dHViZUxpdmUucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXBsYXllcicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b1RoZVRvcCh3aW5kb3dTY3JvbGxUb3ApIHtcclxuICAgIGxldCBvZmZzZXQgPSAxMDAwO1xyXG4gICAgdmFyIGZhZGVEdXJhdGlvbiA9IDUwMDtcclxuICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPiBvZmZzZXQpIHtcclxuICAgICAgICBnb1RvVG9wLmZhZGVJbihmYWRlRHVyYXRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBnb1RvVG9wLmZhZGVPdXQoZmFkZUR1cmF0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVib3VuY2VkU2Nyb2xsRXZlbnRzICgpIHtcclxuICAgICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgZml4TmF2YmFyT25TY3JvbGwod2luZG93U2Nyb2xsVG9wKTtcclxuICAgICAgZml4ZWRWaWRlbyh3aW5kb3dTY3JvbGxUb3ApO1xyXG4gICAgICB0b1RoZVRvcCh3aW5kb3dTY3JvbGxUb3ApO1xyXG4gICAgfVxyXG5cclxuZXhwb3J0IGxldCBhdHRhY2hTY3JvbGxFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgXy5kZWJvdW5jZShkZWJvdW5jZWRTY3JvbGxFdmVudHMsIDIwMCwge2xlYWRpbmc6IHRydWV9KSk7XHJcbiAgICAgIGZpeE5hdmJhck9uU2Nyb2xsKCk7IC8vZmlyZSBvbmNlIG9uIHN0YXJ0XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZml4TmF2YmFyT25TY3JvbGwpO1xyXG4gIH1cclxuIiwiY29uc3QgZHJvcGRvd24gPSAkKCcjc3RyZWFtLWRyb3Bkb3duJyk7XHJcbmNvbnN0IG5hdmJhckJ1cmdlcnMgPSAkKCcubmF2YmFyLWJ1cmdlcicpO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgICBEcm9wZG93blxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJvcGRvd25IYW5kbGVyKCl7XHJcbiAgZHJvcGRvd24ub24oJ2NsaWNrJywgKChlKSA9PiB7XHJcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0KS5zbGlkZVRvZ2dsZShcInNsb3dcIik7XHJcbiAgfSkpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgQnVyZ2VyIE1lbnVcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1cmdlckhhbmRsZXIoKXtcclxuICBuYXZiYXJCdXJnZXJzLm9uKCdjbGljaycsKChlKSA9PiB7XHJcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0KTtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBDYXJvdXNlbHNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaENhcm91c2VscygpIHtcclxuICB2YXIgY2Fyb3VzZWxzID0gYnVsbWFDYXJvdXNlbC5hdHRhY2goKTsgLy8gY2Fyb3VzZWxzIG5vdyBjb250YWlucyBhbiBhcnJheSBvZiBhbGwgQ2Fyb3VzZWwgaW5zdGFuY2VzXHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBTd2lwZXJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuY2xhc3MgcmtTd2lwZXIge1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gJChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLnNjb3BlID0gJCh0aGlzLmVsZW1lbnQpLmRhdGEoJ3Njb3BlJyk7XHJcbiAgICB0aGlzLnByZXZCdXR0b24gPSAkKGAuc3dpcGVyUHJldkJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLm5leHRCdXR0b24gPSAkKGAuc3dpcGVyTmV4dEJ1dHRvbltkYXRhLXNjb3BlPSR7dGhpcy5zY29wZX1dYCk7XHJcbiAgICB0aGlzLml0ZW1zID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5zd2lwZXItaXRlbScpO1xyXG5cclxuICAgIC8vY3VycmVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAvL2Z1bmN0aW9uc1xyXG4gICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnByZXYgPSB0aGlzLnByZXYuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhdHRhY2goc2VsZWN0b3IgPSAnLnN3aXBlci1jb250ZW50Jykge1xyXG4gICAgbGV0IGluc3RhbmNlcyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgcmtTd2lwZXIoZWxlbWVudCkpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5zdGFuY2VzO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IGl0ZW0gaW5kZXgnKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnRlcik7XHJcbiAgICBjb25zb2xlLmxvZygnbGVuZ3RoJyk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aCk7XHJcbiAgICB0aGlzLnRvZ2dsZWJ1dHRvbnMoKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlYnV0dG9ucygpIHtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICQodGhpcy5wcmV2QnV0dG9uKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgICAgICQodGhpcy5uZXh0QnV0dG9uKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuXHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgICQodGhpcy5wcmV2QnV0dG9uKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgICAgICQodGhpcy5uZXh0QnV0dG9uKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgICB9XHJcbiAgfVxyXG5cclxuICBwcmV2KCkge1xyXG4gIGlmICh0aGlzLmNvdW50ZXIgPCB0aGlzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jb3VudGVyKz0xO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLm5leHQoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykucHJldigpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCkge1xyXG4gICAgaWYgKHRoaXMuY291bnRlciA+IDApIHtcclxuICAgICAgdGhpcy5jb3VudGVyLT0xO1xyXG4gICAgICAkKHRoaXMuaXRlbXNbdGhpcy5jb3VudGVyXSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQoYC5jdXJyZW50LWRheS5pcy1hY3RpdmVbZGF0YS1zY29wZT0ke3RoaXMuc2NvcGV9XWApLnByZXYoKS5hZGRDbGFzcygnaXMtYWN0aXZlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgdGhpcy50b2dnbGVidXR0b25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBiaW5kRXZlbnRzKCkge1xyXG4gICAgJCh0aGlzLnByZXZCdXR0b24pLmNsaWNrKHRoaXMucHJldik7XHJcbiAgICAkKHRoaXMubmV4dEJ1dHRvbikuY2xpY2sodGhpcy5uZXh0KTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udGVudFN3aXBlcigpIHtcclxuICB2YXIgc3dpcGVycyA9IHJrU3dpcGVyLmF0dGFjaCgpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgVGFic1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vL1RPRE86IHVzZSBkYXRhLWF0dHJpYnV0ZXMgdG8gY3JlYXRlIHRhYiBncm91cHMgdG8gcHJldmVudCB0YWJzIGZyb20gY29uZmxpY3RpbmcgaW4gY2FzZSBvZiBtdWx0aXBsZSBpbnN0YW5jZXNcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWJzKCkge1xyXG4gICQoJy50YWItdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHRhYiA9ICQodGhpcykuZGF0YSgndGFiLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICQoJy50YWItdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgaWYgKCQoJyMnICsgdGFiICkuaGFzQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKSkge1xyXG4gICAgICAgICQoJy5jb250ZW50LXRhYicpLmFkZENsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKS5kYXRhKCd0YWItY29udGVudCcpKTtcclxuICAgICAgICAkKCcjJyArIHRhYiApLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4tbW9iaWxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkKCcjJyArIHRhYiApLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xyXG4gICAgICAgICQoJy5jb250ZW50LXRhYicpLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50JykpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcblxyXG4gIH0pO1xyXG59XHJcbiJdfQ==
