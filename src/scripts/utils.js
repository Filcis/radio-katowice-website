const dropdown = $('#stream-dropdown');
const navbarBurgers = $('.navbar-burger');

export function dropdownHandler(){
  dropdown.on('click', ((e) => {
      $(e.currentTarget).toggleClass('is-active');
      $(e.currentTarget.dataset.target).slideToggle("slow");
  }));
}

export function burgerHandler(){
  navbarBurgers.on('click',((e) => {
      $(e.currentTarget).toggleClass('is-active');
      console.log(e.currentTarget.dataset);
      $(e.currentTarget.dataset.target).toggleClass('is-active');
  }));
}

export function attachCarousels() {
  var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances
}
