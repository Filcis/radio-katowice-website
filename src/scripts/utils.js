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
                   Swiper
================================================== */
class rkSwiper {
  constructor(selector) {

    this.element = $(selector);
    this.scope = $(this.element).data('scope');
    this.prevButton = $(`.swiperPrevButton[data-scope=${this.scope}]`);
    this.nextButton = $(`.swiperNextButton[data-scope=${this.scope}]`);
    this.items = $(this.element).find('.swiper-item');

    //current element
    this.counter = 0;
    this.length = this.items.length;

    //functions
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    this.init();
  }

  static attach(selector = '.swiper-content') {
    let instances = new Array();

    const elements = document.querySelectorAll(selector);
    [].forEach.call(elements, element => {
      setTimeout(() => {
        instances.push(new rkSwiper(element));
      }, 100);
    });
    return instances;
  }

  init() {
    this.togglebuttons();
    this.bindEvents();
  }

  togglebuttons() {
    if (this.counter === 0) {
       $(this.prevButton).removeClass('inactive');
       $(this.nextButton).addClass('inactive');

     } else {
       $(this.prevButton).addClass('inactive');
       $(this.nextButton).removeClass('inactive');
     }
  }

  nextIndexAddActive() {
  if (this.counter < this.length - 1) {
      this.counter++;
      $(this.items[this.counter]).addClass('is-active').prev().removeClass('is-active');
      $(`.current-day.is-active[data-scope=${this.scope}]`).next().addClass('is-active').prev().removeClass('is-active');
      this.togglebuttons();
    }
  }

  prevIndexAddActive() {
    if (this.counter > 0) {
      this.counter--;
      $(this.items[this.counter]).addClass('is-active').next().removeClass('is-active');
      $(`.current-day.is-active[data-scope=${this.scope}]`).prev().addClass('is-active').next().removeClass('is-active');
      this.togglebuttons();
    }
  }

  bindEvents() {
    $(this.prevButton).click(this.nextIndexAddActive);
    $(this.nextButton).click(this.prevIndexAddActive);
  }

}

export function contentSwiper() {
  var swipers = rkSwiper.attach();
}

/* ==================================================
                   Tabs
================================================== */
//TODO: use data-attributes to create tab groups to prevent tabs from conflicting in case of multiple instances

export function tabs() {
  $('.tab-title').on('click', function() {
      var tab = $(this).data('tab-content');

      $('.tab-title').removeClass('is-active');
      $(this).addClass('is-active');

      if ($('#' + tab ).hasClass('is-hidden-mobile')) {
        $('.content-tab').addClass('is-hidden-mobile');
        console.log($(this).data('tab-content'));
        $('#' + tab ).removeClass('is-hidden-mobile');
      }

      if ($('#' + tab ).hasClass('is-hidden')) {
        $('.content-tab').addClass('is-hidden');
        console.log($(this).data('tab-content'));
        $('#' + tab ).removeClass('is-hidden');
      }

  });
}
