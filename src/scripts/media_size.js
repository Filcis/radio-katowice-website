  const mediaSize = () => {
      if (window.matchMedia('(min-width: 680px)').matches) {
          $('.responsive-carousel').addClass('is-2');
      } else {
          $('.responsive-carousel').removeClass('is-4');
      }
      if (window.matchMedia('(min-width: 968px)').matches) {
          $('.responsive-carousel').addClass('is-4');
      } else {
          $('.responsive-carousel').removeClass('is-4');
      }
  };

export function responsiveResizing() {
  mediaSize();
  $(window).on('resize', _.debounce( mediaSize, 100));
}
