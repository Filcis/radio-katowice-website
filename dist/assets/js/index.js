!function(){function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[i]={exports:{}};t[i][0].call(d.exports,function(e){return o(t[i][1][e]||e)},d,d.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}return e}()({1:[function(e,t,n){"use strict";function r(){i&&s.on("click",function(){$(this).siblings(".navbar-dropdown").toggleClass("open")})}Object.defineProperty(n,"__esModule",{value:!0}),n.initNav=r,n.attachClickEvents=void 0;var o=$("#c-go-top"),a=function(e){e.preventDefault(),$("html, body").animate({scrollTop:0},500)},i=Modernizr.mq("(max-width: 900px)"),s=$(".navbar-link"),c=($("#main-menu .navbar-dropdown"),function(){o.on("click",a),r()});n.attachClickEvents=c},{}],2:[function(e,t,n){"use strict";var r=e("./scroll_events.js"),o=e("./click_events.js"),a=e("./media_size.js"),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(e("./utils.js"));(0,r.attachScrollEvents)(),(0,o.attachClickEvents)(),(0,a.responsiveResizing)(),i.dropdownHandler(),i.burgerHandler(),i.attachCarousels(),i.tabs()},{"./click_events.js":1,"./media_size.js":3,"./scroll_events.js":4,"./utils.js":5}],3:[function(e,t,n){"use strict";function r(){o(),$(window).on("resize",_.debounce(o,100))}Object.defineProperty(n,"__esModule",{value:!0}),n.responsiveResizing=r;var o=function(){window.matchMedia("(min-width: 680px)").matches?$(".responsive-carousel").addClass("is-2"):$(".responsive-carousel").removeClass("is-4"),window.matchMedia("(min-width: 968px)").matches?$(".responsive-carousel").addClass("is-4"):$(".responsive-carousel").removeClass("is-4")}},{}],4:[function(e,t,n){"use strict";function r(){$(window).scrollTop()>=s?(c.addClass("is-fixed-top"),$("body").addClass("has-navbar-fixed-top")):(c.removeClass("is-fixed-top"),$("body").removeClass("has-navbar-fixed-top"))}function o(e){e>=d.top?l.addClass("fixed-player"):l.removeClass("fixed-player")}function a(e){e>1e3?u.fadeIn(500):u.fadeOut(500)}function i(){var e=$(window).scrollTop();r(e),o(e),a(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.attachScrollEvents=void 0;var s=$("#top-add").outerHeight(!0),c=$("#main-nav"),l=$("#sidebar-fixedIframe-wrapper"),d=$("#sidebar-fixedIframe-wrapper").offset(),u=$("#c-go-top"),f=function(){$(window).on("scroll",_.debounce(i,200,{leading:!0})),r(),$(window).on("scroll",r)};n.attachScrollEvents=f},{}],5:[function(e,t,n){"use strict";function r(){s.on("click",function(e){$(e.currentTarget).toggleClass("is-active"),$(e.currentTarget.dataset.target).slideToggle("slow")})}function o(){c.on("click",function(e){$(e.currentTarget).toggleClass("is-active"),console.log(e.currentTarget.dataset),$(e.currentTarget.dataset.target).toggleClass("is-active")})}function a(){bulmaCarousel.attach()}function i(){$(".tab-title").on("click",function(){var e=$(this).data("tab-content");$(".tab-title").removeClass("is-active"),$(this).addClass("is-active"),$(".content-tab").addClass("is-hidden-mobile"),console.log($(this).data("tab-content")),$("#"+e).removeClass("is-hidden-mobile")})}Object.defineProperty(n,"__esModule",{value:!0}),n.dropdownHandler=r,n.burgerHandler=o,n.attachCarousels=a,n.tabs=i;var s=$("#stream-dropdown"),c=$(".navbar-burger")},{}]},{},[2]);
//# sourceMappingURL=index.js.map
