  //private
  let adspace = $('#top-add').outerHeight(true);
  let navbar = $('#main-nav');
  let youtubeLive = $('#sidebar-fixedIframe-wrapper');
  let youtubeLiveScrollTop = $('#sidebar-fixedIframe-wrapper').offset();
  let goToTop = $('#c-go-top');

  function fixNavbarOnScroll() {
    let windowScrollTop = $(window).scrollTop();
      if (windowScrollTop >= adspace) {
          navbar.addClass('is-fixed-top');
          $('body').addClass('has-navbar-fixed-top');
      } else {
          navbar.removeClass('is-fixed-top');
          $('body').removeClass('has-navbar-fixed-top');
      }
  }

  function fixedVideo(windowScrollTop) {
      if (windowScrollTop >= youtubeLiveScrollTop.top) {
          youtubeLive.addClass('fixed-player');
      } else {
          youtubeLive.removeClass('fixed-player');
      }
  }

  function toTheTop(windowScrollTop) {
    let offset = 1000;
    var fadeDuration = 500;
    if (windowScrollTop > offset) {
        goToTop.fadeIn(fadeDuration);
    } else {
        goToTop.fadeOut(fadeDuration);
    }
  }

    function debouncedScrollEvents () {
      let windowScrollTop = $(window).scrollTop();
      fixNavbarOnScroll(windowScrollTop);
      fixedVideo(windowScrollTop);
      toTheTop(windowScrollTop);
    }

export let attachScrollEvents = () => {
      $(window).on('scroll', _.debounce(debouncedScrollEvents, 200, {leading: true}));
      fixNavbarOnScroll(); //fire once on start
      $(window).on('scroll', fixNavbarOnScroll);
  }
