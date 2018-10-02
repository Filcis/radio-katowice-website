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
    console.log(Adspace);
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

    //==================================================
    // TODO: asynchroniczne tooltipy
    // $(".station-list-item").hover(function() {
    //     console.log('ajax request');
    //     var val = $(this).html();
    //
    // $.get('./stations.html'),
    //     function() {
    //         //This function is for unhover.
    //     }
    // });

    //==================================================
    // const tabs = $('a.tab');
    // tabs.click((e) => {
    //     tabs.each((i, e) => {
    //         $(e).parent().removeClass('is-active')
    //         $(e.dataset.target).removeClass('is-active');
    //     });
    //     $(e.currentTarget.dataset.target).addClass('is-active');
    //     $(e.currentTarget).parent().addClass('is-active');
    // });

    //==================================================
    // const carousel = $('.video-carousel');
    // const carouselItems = carousel.children();
    //
    // var nextItem = (el) => el.next().length > 0 ? el.next() : carouselItems.first();
    // var prevItem = (el) => el.prev().length > 0 ? el.prev() : carouselItems.last();
    //
    // $('.carousel-toggle').on('click', (e) => {
    //     var el = $('.is-ref');
    //     if ($(e.currentTarget).data('toggle') === 'next') {
    //         var newItem = nextItem(el);
    //     } else {
    //         var newItem = prevItem(el);
    //     }
    // });

})(jQuery);