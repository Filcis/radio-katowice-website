'use strict';

$(document).ready(() => {
    // TODO: Organize code as different modules
    //==================================================
    const dropdown = $('#stream-dropdown');
    dropdown.click((e) => {
        $(e.currentTarget).toggleClass('is-active');
        $(e.currentTarget.dataset.target).slideToggle("slow");
    });
    //==================================================
    const navbarBurgers = $('.navbar-burger');
    navbarBurgers.click((e) => {
        $(e.currentTarget).toggleClass('is-active');
        console.log(e.currentTarget.dataset);
        $(e.currentTarget.dataset.target).toggleClass('is-active');
    });
    //==================================================
    const tabs = $('a.tab');
    tabs.click((e) => {
        tabs.each((i, e) => {
            $(e).parent().removeClass('is-active')
            $(e.dataset.target).removeClass('is-active');
        });
        $(e.currentTarget.dataset.target).addClass('is-active');
        $(e.currentTarget).parent().addClass('is-active');
    });
    //==================================================
    const carousel = $('.video-carousel');
    const carouselItems = carousel.children();

    var nextItem = (el) => el.next().length > 0 ? el.next() : carouselItems.first();
    var prevItem = (el) => el.prev().length > 0 ? el.prev() : carouselItems.last();

    $('.carousel-toggle').on('click', (e) => {
        var el = $('.is-ref');
        if ($(e.currentTarget).data('toggle') === 'next') {
            var newItem = nextItem(el);
        } else {
            var newItem = prevItem(el);
        }
    })

})