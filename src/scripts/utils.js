const dropdown = $('#stream-dropdown');
const navbarBurgers = $('.navbar-burger');

/* ==================================================
                    Dropdown
================================================== */
export function dropdownHandler(){
  dropdown.on('click', ((e) => {
      $(e.currentTarget).toggleClass('is-active');
      $(e.currentTarget.dataset.target).slideToggle("slow");
  }));
}

/* ==================================================
                   Burger Menu
================================================== */
export function burgerHandler(){
  navbarBurgers.on('click',((e) => {
      $(e.currentTarget).toggleClass('is-active');
      console.log(e.currentTarget.dataset);
      $(e.currentTarget.dataset.target).toggleClass('is-active');
  }));
}

/* ==================================================
                   Carousels
================================================== */
export function attachCarousels() {
  var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances
}

/* ==================================================
                   Tabs
================================================== */
export function tabs() {
  $('.tab-title').on('click', function() {
      var tab = $(this).data('tab-content');

      $('.tab-title').removeClass('is-active');
      $(this).addClass('is-active');

      $('.content-tab').addClass('is-hidden-mobile');
      console.log($(this).data('tab-content'));
      $('#' + tab ).removeClass('is-hidden-mobile');
  });
}
