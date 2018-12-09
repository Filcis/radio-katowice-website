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
//TODO : simplify. Too much repeating

const contentSwiperPrev = $('.swiperPrevButton');
const contentSwiperNext = $('.swiperNextButton');

function toggleSwiperButtons() {

  $(contentSwiperPrev).each( function() {

    var context = $(this).data('scope');
    var content = $(`.swiper-content[data-scope=${context}]`);
    var counter = $(content).find('.swiper-item.is-active').prev().length;

    if (counter > 0) {
      $(this).removeClass('inactive');

    } else {
      $(this).addClass('inactive');
    }
  });

  $(contentSwiperNext).each( function() {

    var context = $(this).data('scope');
    var content = $(`.swiper-content[data-scope=${context}]`);
    var counter = $(content).find('.swiper-item.is-active').next().length;

    if (counter > 0) {
      $(this).removeClass('inactive');

    } else {
      $(this).addClass('inactive');
    }
  });

}

export function contentSwiper() {

  toggleSwiperButtons();

  $(contentSwiperPrev).on('click', function() {
    var context = $(this).data('scope');
    var content = $(`.swiper-content[data-scope=${context}]`);
    var currentDay = $(`.current-day.is-active[data-scope=${context}]`);

    if ($(content).find('.swiper-item.is-active').prev().length != 0) {
        $(content).find('.swiper-item.is-active').prev().addClass('is-active').next().removeClass('is-active');
        $(currentDay).prev().addClass('is-active').next().removeClass('is-active');
        toggleSwiperButtons();
    }

  });

  $(contentSwiperNext).on('click', function() {

    var context = $(this).data('scope');
    var content = $(`.swiper-content[data-scope=${context}]`);
    var currentDay = $(`.current-day.is-active[data-scope=${context}]`);

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
