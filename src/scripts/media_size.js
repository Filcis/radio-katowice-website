  const mediaSize = () => {
      if (Modernizr.mq('(min-width: 986px)')) {
          $('.responsive-carousel').addClass('is-4');
          $('.responsive-carousel').removeClass('is-2');
      } else {
          $('.responsive-carousel').addClass('is-2');
          $('.responsive-carousel').removeClass('is-4');
      }
  };

let query = Modernizr.mq('(max-width: 900px)');

export function responsiveResizing() {
  mediaSize();
  $(window).on('resize', _.debounce( mediaSize, 100));
}
