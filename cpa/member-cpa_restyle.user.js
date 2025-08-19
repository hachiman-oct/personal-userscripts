// ==UserScript==
// @name         Member CPA Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://member-cpa.net/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cpa/member-cpa_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cpa/member-cpa_restyle.user.js
// @description  A userscript to restyle Member CPA pages by hiding ads and other elements
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Member CPA Restyle script loaded");

    const pageMap = {
        home: '/',
        uliza_login: '/uliza_login',
        article: '/articles/',
    };

    const commonStyles = `

    `;

    const style = document.createElement('style');
    style.textContent = commonStyles;
    document.head.appendChild(style);

    if (location.pathname.includes(pageMap.home)) {

        const css = `
        a[href="https://member-cpa.net/cpa-message/"],
        div.sns-wrap,
        div.su-box:has(div.su-box-content > p > a[href="https://www.cpaonline.jp/shopbrand/ct189"]),
        div.su-box:has(div.su-box-content > p > a[href="https://forms.gle/Yuwi6iUYijTs8qtS9"]) {
            display: none;
        }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        style.id = 'home-style';
        document.head.appendChild(style);
    }

    if (location.pathname.includes(pageMap.uliza_login)) {

        const css = `
        tbody#loginLinkTable tr:has(a):not(:has([data-success-year="26"])),
        div#us,
        p:has(a#tanka[href="https://tlp.edulio.com/cpa/"]) {
            display: none;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        style.id = 'uliza-login-style';
        document.head.appendChild(style);
    }
    
    if (location.pathname.includes(pageMap.article)) {
        console.log("Article page detected");

        const css = `
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();