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
    // const tabs = $('a.tab');
    // console.log(tabs);
    // tabs.click((e) => {
    //     $(e.currentTarget).toggleClass('is-active');
    //     console.log(e.currentTarget.dataset.target);
    // });
    //==================================================
    var carousels = bulmaCarousel.attach();
})