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
rkUtilities.tabs();


//testy
