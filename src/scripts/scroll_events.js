  //private
  let adspace = $('#top-add').outerHeight(true);
  let navbar = $('#main-nav');
  let youtubeLive = $('#sidebar-fixedIframe-wrapper');
  let youtubeLiveScrollTop = $('#sidebar-fixedIframe-wrapper').offset();
  let goToTop = $('#c-go-top');

  function fixNavbarOnScroll() {
    //bez debounce
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
    if(youtubeLive.length != 0) {
      if (windowScrollTop >= youtubeLiveScrollTop.top) {
          youtubeLive.addClass('fixed-player');
      } else {
          youtubeLive.removeClass('fixed-player');
      }
    }
  }

  function toTheTop(windowScrollTop) {
    let offset = 1000;
    var fadeDuration = 500;
    if (windowScrollTop > offset) {
        goToTop.fadeTo(fadeDuration, 0.8);
    } else if (windowScrollTop <= offset) {
        goToTop.fadeOut(fadeDuration);
    }
  }

    function debouncedScrollEvents () {
      let windowScrollTop = $(window).scrollTop();
      fixedVideo(windowScrollTop);
      toTheTop(windowScrollTop);
    }

export let attachScrollEvents = () => {
      $(window).on('scroll', _.debounce(debouncedScrollEvents, 200, {leading: true}));
      fixNavbarOnScroll(); //fire once on start
      $(window).on('scroll', fixNavbarOnScroll);
  }
