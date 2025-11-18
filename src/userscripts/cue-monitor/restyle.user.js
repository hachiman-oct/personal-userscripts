// ==UserScript==
// @name         Cue Monitor Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.0
// @match        https://nsv.cue-monitor.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/cue-monitor/cue-monitor_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/cue-monitor/cue-monitor_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Cue Monitor Restyle script loaded");

    const pageMap = {
        answer: '/ans/pc/',
    };

    if (location.pathname.includes(pageMap.answer)) {
        console.log("Answer page detected");

        const css = `
        td.itile_cate_default,
        li.next-button,
        input[type='button'],
        table.qb {
            background: none !important;
        }
        td.itile_cate_select {
            background-image: none !important;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();
