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

//NAVIGATION


export function initNav() {
  if(query){
    dropdown.on('click', function() {
        $(this).siblings('.navbar-dropdown').toggleClass('open');
      });
  }
}

export let attachClickEvents = () => {
  goToTopButton.on('click', goToTop);
  initNav();
}
