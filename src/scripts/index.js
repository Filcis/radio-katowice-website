'use strict';
/*jshint esversion: 6 */

// TODO: Zorganizowac kod jako oddzielne moduły
//==================================================

import { attachScrollEvents } from './scroll_events.js';
import { attachClickEvents } from './click_events.js';
import { responsiveResizing } from './media_size.js';
import * as rkUtilities from './utils.js'

attachScrollEvents();
attachClickEvents();
responsiveResizing();
rkUtilities.dropdownHandler();
rkUtilities.burgerHandler();
rkUtilities.attachCarousels();

(function($, window, console) {
    //==================================================
    // Player popup
    //==================================================

    // if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     $('#player-main-call-to-action').click(function(e) {
    //         e.preventDefault();
    //         window.open(this.href, "RK_Player", "width=360,height=640");
    //         console.log('player popup');
    //         return false;
    //     });
    // }



})(jQuery, window, console);
