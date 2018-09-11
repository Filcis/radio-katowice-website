'use strict';

$(document).ready(() => {
    // TODO: Organize code as different modules
    //==================================================
    const dropdown = $('#stream-dropdown');
    dropdown.click((e) => {
        $(e.currentTarget).toggleClass('is-active');
    });
    //==================================================
    const navbarBurgers = $('.navbar-burger');
    navbarBurgers.click((e) => {
        $(e.currentTarget).toggleClass('is-active');
        console.log(e.currentTarget.dataset);
        $(e.currentTarget.dataset.target).slideToggle("slow");
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
    var carousels = bulmaCarousel.attach();
})