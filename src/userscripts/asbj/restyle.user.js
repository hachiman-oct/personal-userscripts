// ==UserScript==
// @name         ASBJ Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.0
// @match        https://www.asb-j.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/asbj/restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/asbj/restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // パスが '/jp/accounting_standards.html' のときのみ実行
    if (location.pathname === '/jp/accounting_standards.html') {
        const container = document.querySelector('div#setPagerTbl-0');

        if (container) {
            // 1. tbody内のすべてのtrに対して style="display: none;" を除去
            // (displayプロパティを空にすることで、インラインスタイルの none を無効化します)
            const rows = container.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.style.display = '';
            });

            // 2. div.p-pagenavi を style="display: none;" にする
            const pageNavi = container.querySelector('div.p-pagenavi');
            if (pageNavi) {
                pageNavi.style.display = 'none';
            }
        }
    }

})();