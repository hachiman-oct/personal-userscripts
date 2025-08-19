// ==UserScript==
// @name         Libra JPN Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.2
// @match        https://tokyo-cpa.libra.jpn.com/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cpa/libra.jpn_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cpa/libra.jpn_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Restyle script loaded");

    const pageMap = {
        home: '#/home?',
    };

    if (location.hash.includes(pageMap.home)) {

        const css = `
        header,
        footer {
            display: none !important;
        }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        style.id = 'home-style';
        document.head.appendChild(style);
    }
})();