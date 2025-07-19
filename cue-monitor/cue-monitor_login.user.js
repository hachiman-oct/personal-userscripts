// ==UserScript==
// @name         Cue Monitor Login
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.0
// @match        https://mypage.cue-monitor.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cue-monitor/cue-monitor_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/cue-monitor/cue-monitor_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Cue Monitor Login script loaded");

    const pageList = [
        '/sp/mypage/asking_pwd.html',
        '/sp/mypage/my_info_foc.html'
    ];

    const shouldRedirect = pageList.some(pagePath => location.pathname.includes(pagePath));

    if (shouldRedirect) {
        console.log(`Redirecting from ${location.pathname} to mytop.html`);
        window.location.href = 'https://mypage.cue-monitor.jp/sp/mypage/mytop.html';
    }
})();