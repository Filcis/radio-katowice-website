//private
let goToTopButton = $('#c-go-top');
let goToTop = (event)=> {
  event.preventDefault();
  $('html, body').animate({
      scrollTop: 0
  }, 500);
}

let query = Modernizr.mq('(max-width: 900px)');
let dropdown = $('.navbar-link');
let submenus = $('#main-menu .navbar-dropdown');



//==================================================
// Player popup
//==================================================
function playerPopup() {
  let WindowObjectReference;
  console.log('playerPopup');
  function openRequestedPopup() {
    console.log('openRequestedPopup');
      $('.button.call-to-action ').click(function(e) {
        e.preventDefault();
        WindowObjectReference = window.open(this.href, "RK_Player", "width=360,height=640");
        return false;
    });
  }
  openRequestedPopup();
}
//
// if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     $('#player-main-call-to-action').click(function(e) {
//         e.preventDefault();
//         window.open(this.href, "RK_Player", "width=360,height=640");
//         console.log('player popup');
//         return false;
//     });
// }

//NAVIGATION
function initNav() {
  if(query){
    dropdown.on('click', function() {
        $(this).siblings('.navbar-dropdown').toggleClass('open');
      });
  }
}

export let attachClickEvents = () => {
  goToTopButton.on('click', goToTop);
  initNav();
  playerPopup();
}