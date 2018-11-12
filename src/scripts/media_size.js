const mediaSize = () => {
      if(Modernizr.mq('(max-width: 600px)')) {
        $('.responsive-carousel').addClass('is-1');
        $('.responsive-carousel').removeClass('is-2 is-4');
      } else if(Modernizr.mq('(max-width: 900px)')) {
        $('.responsive-carousel').addClass('is-2');
        $('.responsive-carousel').removeClass('is-1 is-4');
      } else if(Modernizr.mq('(min-width: 1088px)')) {
        $('.responsive-carousel').addClass('is-4');
        $('.responsive-carousel').removeClass('is-1 is-2');
      }
  };

export function responsiveResizing() {
  mediaSize();
  $(window).on('resize', _.debounce( mediaSize, 100));
}
