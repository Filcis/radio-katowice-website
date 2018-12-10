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
//TODO : simplify. Too much repeating


var contentSwiperPrev = $('.swiperPrevButton');
var contentSwiperNext = $('.swiperNextButton');

function toggleSwiperButtons() {
  $(contentSwiperPrev).each(function () {
    var context = $(this).data('scope');
    var content = $(".swiper-content[data-scope=".concat(context, "]"));
    var counter = $(content).find('.swiper-item.is-active').prev().length;

    if (counter > 0) {
      $(this).removeClass('inactive');
    } else {
      $(this).addClass('inactive');
    }
  });
  $(contentSwiperNext).each(function () {
    var context = $(this).data('scope');
    var content = $(".swiper-content[data-scope=".concat(context, "]"));
    var counter = $(content).find('.swiper-item.is-active').next().length;

    if (counter > 0) {
      $(this).removeClass('inactive');
    } else {
      $(this).addClass('inactive');
    }
  });
}

function contentSwiper() {
  toggleSwiperButtons();
  $(contentSwiperPrev).on('click', function () {
    var context = $(this).data('scope');
    var content = $(".swiper-content[data-scope=".concat(context, "]"));
    var currentDay = $(".current-day.is-active[data-scope=".concat(context, "]"));

    if ($(content).find('.swiper-item.is-active').prev().length != 0) {
      $(content).find('.swiper-item.is-active').prev().addClass('is-active').next().removeClass('is-active');
      $(currentDay).prev().addClass('is-active').next().removeClass('is-active');
      toggleSwiperButtons();
    }
  });
  $(contentSwiperNext).on('click', function () {
    var context = $(this).data('scope');
    var content = $(".swiper-content[data-scope=".concat(context, "]"));
    var currentDay = $(".current-day.is-active[data-scope=".concat(context, "]"));

    if ($(content).find('.swiper-item.is-active').next().length != 0) {
      $(content).find('.swiper-item.is-active').next().addClass('is-active').prev().removeClass('is-active');
      $(currentDay).next().addClass('is-active').prev().removeClass('is-active');
      toggleSwiperButtons();
    }
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jbGlja19ldmVudHMuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyIsInNyYy9zY3JpcHRzL21lZGlhX3NpemUuanMiLCJzcmMvc2NyaXB0cy9zY3JvbGxfZXZlbnRzLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztvQ0NBQTs7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLFdBQXFCLENBQXJCOztBQUNBLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFBLEtBQUEsRUFBVTtBQUN0QixFQUFBLEtBQUssQ0FBTCxjQUFBO0FBQ0EsRUFBQSxDQUFDLENBQUQsWUFBQyxDQUFELENBQUEsT0FBQSxDQUF3QjtBQUNwQixJQUFBLFNBQVMsRUFBRTtBQURTLEdBQXhCLEVBQUEsR0FBQTtBQUZGLENBQUE7O0FBT0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFoQixjQUFnQixDQUFoQjtBQUNBLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBaEIsNkJBQWdCLENBQWhCO0FBQ0EsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFyQixrQkFBcUIsQ0FBckI7QUFDQSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBeEIsb0JBQXdCLENBQXhCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFqQixrQkFBaUIsQ0FBakI7QUFDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQXJCLHFCQUFxQixDQUFyQixDLENBR0E7QUFDQTtBQUNBOztBQUNBLElBQUksd0JBQXdCLEdBQTVCLElBQUE7O0FBQ0EsU0FBQSxXQUFBLEdBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFELHFEQUFDLENBQUQsQ0FBQSxLQUFBLENBQStELFVBQUEsQ0FBQSxFQUFZO0FBQ3pFLElBQUEsQ0FBQyxDQUFELGNBQUE7QUFDQSxJQUFBLGtCQUFrQixDQUFDLENB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Q0FBQSxRQUFBLENBQUEsV0FBQTtBQUNBLE1BQUEsT0FBTyxDQUFQLEdBQUEsQ0FBWSxDQUFDLENBQUQsSUFBQyxDQUFELENBQUEsSUFBQSxDQUFaLGFBQVksQ0FBWjtBQUNBLE1BQUEsQ0FBQyxDQUFDLE1BQUYsR0FBQyxDQUFELENBQUEsV0FBQSxDQUFBLFdBQUE7QUFDRDtBQWhCTCxHQUFBO0FBbUJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9wcml2YXRlXHJcbmxldCBnb1RvVG9wQnV0dG9uID0gJCgnI2MtZ28tdG9wJyk7XHJcbmxldCBnb1RvVG9wID0gKGV2ZW50KT0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgfSwgNTAwKTtcclxufVxyXG5cclxubGV0IGRyb3Bkb3duID0gJCgnLm5hdmJhci1saW5rJyk7XHJcbmxldCBzdWJtZW51cyA9ICQoJyNtYWluLW1lbnUgLm5hdmJhci1kcm9wZG93bicpO1xyXG5sZXQgYWNjb3JkaW9uTGluayA9ICQoJy5hY2NvcmRpb24tdGl0bGUnKTtcclxubGV0IGFjY29yZGlvbkNvbnRlbnQgPSAkKCcuYWNjb3JkaW9uLWNvbnRlbnQnKTtcclxubGV0IHNob3J0Y3V0cyA9ICQoJy5wbGF5ZXItc2hvcnRjdXQnKTtcclxubGV0IHBsYXllcl9idXR0b24gPSAkKCcjcGxheWVyLWJ1dHRvbi1wbGF5Jyk7XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQbGF5ZXIgcG9wdXBcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG52YXIgcmtfV2luZG93T2JqZWN0UmVmZXJlbmNlID0gbnVsbDtcclxuZnVuY3Rpb24gcGxheWVyUG9wdXAoKSB7XHJcbiAgJCgnLmJ1dHRvbi5jYWxsLXRvLWFjdGlvbiwgI3BsYXllci1tYWluLWNhbGwtdG8tYWN0aW9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblJlcXVlc3RlZFBvcHVwKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJlcXVlc3RlZFBvcHVwKHVybCkge1xyXG4gIGlmIChya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPT0gbnVsbCB8fCBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UuY2xvc2VkKSB7XHJcbiAgICBya19XaW5kb3dPYmplY3RSZWZlcmVuY2UgPSB3aW5kb3cub3Blbih1cmwsIFwiUktfUGxheWVyXCIsIFwid2lkdGg9MzYwLGhlaWdodD02NDBcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJrX1dpbmRvd09iamVjdFJlZmVyZW5jZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG5cclxuLy9OQVZJR0FUSU9OXHJcbmZ1bmN0aW9uIGluaXROYXYobGluaywgZWxlbWVudCkge1xyXG4gICAgbGluay5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKGVsZW1lbnQpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQbGF5KCkge1xyXG4gIHNob3J0Y3V0cy5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgc2hvcnRjdXRzLm5vdCgkKHRoaXMpKS5yZW1vdmVDbGFzcygncGxheScpO1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheScpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXllclRvZ2dsZVBsYXkoKSB7XHJcbiAgcGxheWVyX2J1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygncGxheWluZycpO1xyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYXR0YWNoQ2xpY2tFdmVudHMgPSAoKSA9PiB7XHJcbiAgZ29Ub1RvcEJ1dHRvbi5vbignY2xpY2snLCBnb1RvVG9wKTtcclxuICBpbml0TmF2KGRyb3Bkb3duLCBzdWJtZW51cyk7XHJcbiAgaW5pdE5hdihhY2NvcmRpb25MaW5rLCBhY2NvcmRpb25Db250ZW50KTtcclxuICBwbGF5ZXJUb2dnbGVQbGF5KCk7XHJcbiAgdG9nZ2xlUGxheSgpO1xyXG4gIHBsYXllclBvcHVwKCk7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuLypqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmltcG9ydCB7IGF0dGFjaFNjcm9sbEV2ZW50cyB9IGZyb20gJy4vc2Nyb2xsX2V2ZW50cy5qcyc7XG5pbXBvcnQgeyBhdHRhY2hDbGlja0V2ZW50cyB9IGZyb20gJy4vY2xpY2tfZXZlbnRzLmpzJztcbmltcG9ydCB7IHJlc3BvbnNpdmVSZXNpemluZyB9IGZyb20gJy4vbWVkaWFfc2l6ZS5qcyc7XG5pbXBvcnQgKiBhcyBya1V0aWxpdGllcyBmcm9tICcuL3V0aWxzLmpzJ1xuYXR0YWNoU2Nyb2xsRXZlbnRzKCk7XG5hdHRhY2hDbGlja0V2ZW50cygpO1xucmVzcG9uc2l2ZVJlc2l6aW5nKCk7XG5ya1V0aWxpdGllcy5kcm9wZG93bkhhbmRsZXIoKTtcbnJrVXRpbGl0aWVzLmJ1cmdlckhhbmRsZXIoKTtcbnJrVXRpbGl0aWVzLmF0dGFjaENhcm91c2VscygpO1xucmtVdGlsaXRpZXMudGFicygpO1xucmtVdGlsaXRpZXMuY29udGVudFN3aXBlcigpO1xuLy90ZXN0eVxuIiwiY29uc3QgbWVkaWFTaXplID0gKCkgPT4ge1xyXG4gICAgICBpZihNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6IDYwMHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtMScpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTIgaXMtNCcpO1xyXG4gICAgICB9IGVsc2UgaWYoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiA5MDBweCknKSkge1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykuYWRkQ2xhc3MoJ2lzLTInKTtcclxuICAgICAgICAkKCcucmVzcG9uc2l2ZS1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdpcy0xIGlzLTQnKTtcclxuICAgICAgfSBlbHNlIGlmKE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDogMTA4OHB4KScpKSB7XHJcbiAgICAgICAgJCgnLnJlc3BvbnNpdmUtY2Fyb3VzZWwnKS5hZGRDbGFzcygnaXMtNCcpO1xyXG4gICAgICAgICQoJy5yZXNwb25zaXZlLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ2lzLTEgaXMtMicpO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zaXZlUmVzaXppbmcoKSB7XHJcbiAgbWVkaWFTaXplKCk7XHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKCBtZWRpYVNpemUsIDEwMCkpO1xyXG59XHJcbiIsIiAgLy9wcml2YXRlXHJcbiAgbGV0IGFkc3BhY2UgPSAkKCcjdG9wLWFkZCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gIGxldCBuYXZiYXIgPSAkKCcjbWFpbi1uYXYnKTtcclxuICBsZXQgeW91dHViZUxpdmUgPSAkKCcjc2lkZWJhci1maXhlZElmcmFtZS13cmFwcGVyJyk7XHJcbiAgbGV0IHlvdXR1YmVMaXZlU2Nyb2xsVG9wID0gJCgnI3NpZGViYXItZml4ZWRJZnJhbWUtd3JhcHBlcicpLm9mZnNldCgpO1xyXG4gIGxldCBnb1RvVG9wID0gJCgnI2MtZ28tdG9wJyk7XHJcblxyXG4gIGZ1bmN0aW9uIGZpeE5hdmJhck9uU2Nyb2xsKCkge1xyXG4gICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+PSBhZHNwYWNlKSB7XHJcbiAgICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ2lzLWZpeGVkLXRvcCcpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoYXMtbmF2YmFyLWZpeGVkLXRvcCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmF2YmFyLnJlbW92ZUNsYXNzKCdpcy1maXhlZC10b3AnKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLW5hdmJhci1maXhlZC10b3AnKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZml4ZWRWaWRlbyh3aW5kb3dTY3JvbGxUb3ApIHtcclxuICAgIGlmKHlvdXR1YmVMaXZlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIGlmICh3aW5kb3dTY3JvbGxUb3AgPj0geW91dHViZUxpdmVTY3JvbGxUb3AudG9wKSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5hZGRDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5b3V0dWJlTGl2ZS5yZW1vdmVDbGFzcygnZml4ZWQtcGxheWVyJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCkge1xyXG4gICAgbGV0IG9mZnNldCA9IDEwMDA7XHJcbiAgICB2YXIgZmFkZUR1cmF0aW9uID0gNTAwO1xyXG4gICAgaWYgKHdpbmRvd1Njcm9sbFRvcCA+IG9mZnNldCkge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZUluKGZhZGVEdXJhdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdvVG9Ub3AuZmFkZU91dChmYWRlRHVyYXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWJvdW5jZWRTY3JvbGxFdmVudHMgKCkge1xyXG4gICAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBmaXhOYXZiYXJPblNjcm9sbCh3aW5kb3dTY3JvbGxUb3ApO1xyXG4gICAgICBmaXhlZFZpZGVvKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICAgIHRvVGhlVG9wKHdpbmRvd1Njcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgbGV0IGF0dGFjaFNjcm9sbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLmRlYm91bmNlKGRlYm91bmNlZFNjcm9sbEV2ZW50cywgMjAwLCB7bGVhZGluZzogdHJ1ZX0pKTtcclxuICAgICAgZml4TmF2YmFyT25TY3JvbGwoKTsgLy9maXJlIG9uY2Ugb24gc3RhcnRcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmaXhOYXZiYXJPblNjcm9sbCk7XHJcbiAgfVxyXG4iLCJjb25zdCBkcm9wZG93biA9ICQoJyNzdHJlYW0tZHJvcGRvd24nKTtcclxuY29uc3QgbmF2YmFyQnVyZ2VycyA9ICQoJy5uYXZiYXItYnVyZ2VyJyk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgIERyb3Bkb3duXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkcm9wZG93bkhhbmRsZXIoKXtcclxuICBkcm9wZG93bi5vbignY2xpY2snLCAoKGUpID0+IHtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBCdXJnZXIgTWVudVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVyZ2VySGFuZGxlcigpe1xyXG4gIG5hdmJhckJ1cmdlcnMub24oJ2NsaWNrJywoKGUpID0+IHtcclxuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQpO1xyXG4gICAgICAkKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIENhcm91c2Vsc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoQ2Fyb3VzZWxzKCkge1xyXG4gIHZhciBjYXJvdXNlbHMgPSBidWxtYUNhcm91c2VsLmF0dGFjaCgpOyAvLyBjYXJvdXNlbHMgbm93IGNvbnRhaW5zIGFuIGFycmF5IG9mIGFsbCBDYXJvdXNlbCBpbnN0YW5jZXNcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgICAgICAgIFN3aXBlclxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vL1RPRE8gOiBzaW1wbGlmeS4gVG9vIG11Y2ggcmVwZWF0aW5nXHJcblxyXG5jb25zdCBjb250ZW50U3dpcGVyUHJldiA9ICQoJy5zd2lwZXJQcmV2QnV0dG9uJyk7XHJcbmNvbnN0IGNvbnRlbnRTd2lwZXJOZXh0ID0gJCgnLnN3aXBlck5leHRCdXR0b24nKTtcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVN3aXBlckJ1dHRvbnMoKSB7XHJcblxyXG4gICQoY29udGVudFN3aXBlclByZXYpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gJCh0aGlzKS5kYXRhKCdzY29wZScpO1xyXG4gICAgdmFyIGNvbnRlbnQgPSAkKGAuc3dpcGVyLWNvbnRlbnRbZGF0YS1zY29wZT0ke2NvbnRleHR9XWApO1xyXG4gICAgdmFyIGNvdW50ZXIgPSAkKGNvbnRlbnQpLmZpbmQoJy5zd2lwZXItaXRlbS5pcy1hY3RpdmUnKS5wcmV2KCkubGVuZ3RoO1xyXG5cclxuICAgIGlmIChjb3VudGVyID4gMCkge1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoY29udGVudFN3aXBlck5leHQpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gJCh0aGlzKS5kYXRhKCdzY29wZScpO1xyXG4gICAgdmFyIGNvbnRlbnQgPSAkKGAuc3dpcGVyLWNvbnRlbnRbZGF0YS1zY29wZT0ke2NvbnRleHR9XWApO1xyXG4gICAgdmFyIGNvdW50ZXIgPSAkKGNvbnRlbnQpLmZpbmQoJy5zd2lwZXItaXRlbS5pcy1hY3RpdmUnKS5uZXh0KCkubGVuZ3RoO1xyXG5cclxuICAgIGlmIChjb3VudGVyID4gMCkge1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udGVudFN3aXBlcigpIHtcclxuXHJcbiAgdG9nZ2xlU3dpcGVyQnV0dG9ucygpO1xyXG5cclxuICAkKGNvbnRlbnRTd2lwZXJQcmV2KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb250ZXh0ID0gJCh0aGlzKS5kYXRhKCdzY29wZScpO1xyXG4gICAgdmFyIGNvbnRlbnQgPSAkKGAuc3dpcGVyLWNvbnRlbnRbZGF0YS1zY29wZT0ke2NvbnRleHR9XWApO1xyXG4gICAgdmFyIGN1cnJlbnREYXkgPSAkKGAuY3VycmVudC1kYXkuaXMtYWN0aXZlW2RhdGEtc2NvcGU9JHtjb250ZXh0fV1gKTtcclxuXHJcbiAgICBpZiAoJChjb250ZW50KS5maW5kKCcuc3dpcGVyLWl0ZW0uaXMtYWN0aXZlJykucHJldigpLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgJChjb250ZW50KS5maW5kKCcuc3dpcGVyLWl0ZW0uaXMtYWN0aXZlJykucHJldigpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQoY3VycmVudERheSkucHJldigpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHRvZ2dsZVN3aXBlckJ1dHRvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gICQoY29udGVudFN3aXBlck5leHQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBjb250ZXh0ID0gJCh0aGlzKS5kYXRhKCdzY29wZScpO1xyXG4gICAgdmFyIGNvbnRlbnQgPSAkKGAuc3dpcGVyLWNvbnRlbnRbZGF0YS1zY29wZT0ke2NvbnRleHR9XWApO1xyXG4gICAgdmFyIGN1cnJlbnREYXkgPSAkKGAuY3VycmVudC1kYXkuaXMtYWN0aXZlW2RhdGEtc2NvcGU9JHtjb250ZXh0fV1gKTtcclxuXHJcbiAgICBpZiAoJChjb250ZW50KS5maW5kKCcuc3dpcGVyLWl0ZW0uaXMtYWN0aXZlJykubmV4dCgpLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgJChjb250ZW50KS5maW5kKCcuc3dpcGVyLWl0ZW0uaXMtYWN0aXZlJykubmV4dCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQoY3VycmVudERheSkubmV4dCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHRvZ2dsZVN3aXBlckJ1dHRvbnMoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICBUYWJzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vVE9ETzogdXNlIGRhdGEtYXR0cmlidXRlcyB0byBjcmVhdGUgdGFiIGdyb3VwcyB0byBwcmV2ZW50IHRhYnMgZnJvbSBjb25mbGljdGluZyBpbiBjYXNlIG9mIG11bHRpcGxlIGluc3RhbmNlc1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRhYnMoKSB7XHJcbiAgJCgnLnRhYi10aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdGFiID0gJCh0aGlzKS5kYXRhKCd0YWItY29udGVudCcpO1xyXG5cclxuICAgICAgJCgnLnRhYi10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICBpZiAoJCgnIycgKyB0YWIgKS5oYXNDbGFzcygnaXMtaGlkZGVuLW1vYmlsZScpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ3RhYi1jb250ZW50JykpO1xyXG4gICAgICAgICQoJyMnICsgdGFiICkucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbi1tb2JpbGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJyMnICsgdGFiICkuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtdGFiJykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykuZGF0YSgndGFiLWNvbnRlbnQnKSk7XHJcbiAgICAgICAgJCgnIycgKyB0YWIgKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgfSk7XHJcbn1cclxuIl19
