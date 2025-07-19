// ==UserScript==
// @name         Game8 Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://game8.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/game8_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/game8_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Game8 Restyle script loaded");

    const pageMap = {
        pokemonsleep: '/pokemonsleep',
        article: '/articles/',
    };

    const commonStyles = `
    #jump_header,
    browsispot,
    #zucks_wipead,
    .l-fixedGameHeader__theme,
    .l-fixedGameHeader__feedback,
    .l-fixedGameHeader__pointLink {
        display: none !important;}
    `;

    const style = document.createElement('style');
    style.textContent = commonStyles;
    document.head.appendChild(style);

    if (location.pathname.includes(pageMap.pokemonsleep)) {
        console.log("pokemonsleep page detected");

        const css = `
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    } else if (location.pathname.includes(pageMap.article)) {
        console.log("Article page detected");

        const css = `
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();