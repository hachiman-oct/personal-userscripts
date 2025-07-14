// ==UserScript==
// @name         ToKoPo Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://tokopo.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/tokopo_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/tokopo_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("ToKoPo Restyle script loaded");

        const pageMap = {
        mypage: 'div.mypage_main',
        login: 'form[name="LoginForm"]',
    };

    if (document.querySelector(pageMap.login)) {
        console.log("login page detected");

        const css = `
        h1.ui-title,
        div.ui-grid-solo,
        ul[data-divider-theme="a"],
        form[name="MemberRegistMailForm"] {
            display: none !important;}
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();