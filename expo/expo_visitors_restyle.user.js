// ==UserScript==
// @name         Expo Visitors Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.0
// @match        https://www.expovisitors.expo2025.or.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_visitors_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_visitors_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Expo Visitors Restyle script loaded");

    const css = `
    section.pavilion_reserve,
    section.pavilion_detail_phone,
    div#banner.banner,
    div.footer__content {
        display: none !important;
    }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();