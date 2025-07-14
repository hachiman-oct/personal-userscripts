// ==UserScript==
// @name         Cue Monitor Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://mypage.cue-monitor.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cue-monitor/cue-monitor_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cue-monitor/cue-monitor_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Cue Monitor Restyle script loaded");

    const pageMap = {
        asking_pwd: '/sp/mypage/asking_pwd.html',
        answer: '/ans/pc/',
    };


    function clickIfExists(selector) {
        const el = document.querySelector(selector);
        if (!el) {
            console.warn(`"${selector}" not found`);
            return false;
        }
        el.click();
        return true;
    }

    if (location.pathname.includes(pageMap.asking_pwd)) {
        console.log("Asking password page detected");
        if (!clickIfExists("label.checkbox-inline")) return;
        clickIfExists("button[type='submit']");
    }

    if (location.pathname.includes(pageMap.answer)) {
        console.log("Answer page detected");

        const css = `
        td.itile_cate_default,
        li.next-button,
        input[type='button'] {
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