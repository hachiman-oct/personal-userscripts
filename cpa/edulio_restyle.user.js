// ==UserScript==
// @name         edulio Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://tlp.edulio.com/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cpa/edulio_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cpa/edulio_restyle.user.js
// @description  A userscript to restyle Edulio pages by hiding ads and other elements
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Restyle script loaded");

    const pageMap = {
        home: '/',
    };

    const commonStyles = `
    span#mdl-navtitle-cart,
    span#mdl-navigation-cart {
        display: none !important;
    }
    `;

    const style = document.createElement('style');
    style.textContent = commonStyles;
    document.head.appendChild(style);

    if (location.pathname.includes(pageMap.home)) {

        const css = `
        `;
        const style = document.createElement('style');
        style.textContent = css;
        style.id = 'home-style';
        document.head.appendChild(style);
    }
})();