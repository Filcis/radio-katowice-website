'use strict';

// TODO: Zorganizowac kod jako oddzielne moduły
//==================================================


(function($) {

    //==================================================
    // Player popup
    //==================================================

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('#player-main-call-to-action').click(function(e) {
            e.preventDefault();
            window.open(this.href, "RK_Player", "width=360,height=640");
            console.log('player popup');
            return false;
        });
    }
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
    }

    mediaSize();
    /* Attach the function to the resize event listener */
    window.addEventListener('resize', mediaSize, false);
    //==================================================
    // Dropdown
    //==================================================

    const dropdown = $('#stream-dropdown');
    dropdown.click((e) => {
        $(e.currentTarget).toggleClass('is-active');
        $(e.currentTarget.dataset.target).slideToggle("slow");
    });

    //==================================================
    // Burger
    //==================================================

    const navbarBurgers = $('.navbar-burger');
    navbarBurgers.click((e) => {
        $(e.currentTarget).toggleClass('is-active');
        console.log(e.currentTarget.dataset);
        $(e.currentTarget.dataset.target).toggleClass('is-active');
    });

    //==================================================
    // Sticky menu
    //==================================================

    let Adspace = $('#top-add').outerHeight(true);
    let navbar = $('#main-nav');
    $(window).scroll((event) => {
        let windowScrollTop = $(window).scrollTop();
        if (windowScrollTop >= Adspace) {
            navbar = $('#main-nav').addClass('is-fixed-top');
            $('body').addClass('has-navbar-fixed-top');
        } else {
            navbar = $('#main-nav').removeClass('is-fixed-top');
            $('body').removeClass('has-navbar-fixed-top');
        }

    })

    // =================================================
    // To the top
    // =================================================
    $(function() {
        // Amount of scrolling before button is shown/hidden.
        var offset = 1000;

        // Fade duration
        var duration = 500;

        // Toggle view of button when scrolling.
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('#c-go-top').fadeIn(duration);
            } else {
                $('#c-go-top').fadeOut(duration);
            }
        });

        // Scroll to top when button is clicked.
        $('#c-go-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    });

    var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances

})(jQuery);