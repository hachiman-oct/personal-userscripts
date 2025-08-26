// ==UserScript==
// @name         Midcity Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://www.midcity.co.kr/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/midcity_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/midcity_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Restyle script loaded");

    const commonStyles = `
    div.pop_notice_set,
    a.bookingButton {
        display: none !important;}
    `;

    const style = document.createElement('style');
    style.textContent = commonStyles;
    document.head.appendChild(style);
})();