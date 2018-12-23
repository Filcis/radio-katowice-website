//private
let goToTopButton = $('#c-go-top');
let goToTop = (event)=> {
  event.preventDefault();
  $('html, body').animate({
      scrollTop: 0
  }, 500);
}

let dropdown = $('.navbar-link');
let submenus = $('#main-menu .navbar-dropdown');
let accordionLink = $('.accordion-title');
let accordionContent = $('.accordion-content');
let shortcuts = $('.player-shortcut');
let player_button = $('#player-button-play');


//==================================================
// Player popup
//==================================================
var rk_WindowObjectReference = null;
function playerPopup() {
  $('.button.call-to-action, #player-main-call-to-action').click(function(e) {
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
}

// ACCORDION
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
  shortcuts.on('click', function(){
    shortcuts.not($(this)).removeClass('play');
    $(this).toggleClass('play');
  })
}

function playerTogglePlay() {
  player_button.on('click', function(){
    $(this).toggleClass('playing');
  })
}

export let attachClickEvents = () => {
  goToTopButton.on('click', goToTop);
  // responsiveNav()
  // $(window).on('resize', _.debounce( responsiveNav, 100));
  // dropdownToggle(accordionLink, accordionContent);
  playerTogglePlay();
  togglePlay();
  playerPopup();
}
