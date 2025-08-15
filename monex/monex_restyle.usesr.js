// ==UserScript==
// @name         Monex Fund Order Sum with Clipboard Copy
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.1
// @include      https://mxp1.monex.co.jp/pc/servlet/ITS/fund/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/monex/monex_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/monex/monex_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    function hideDisplayImportant(el) {
        if (el) {
            el.style.setProperty('display', 'none', 'important');
        }
    }
    
    hideDisplayImportant(document.querySelector('#client-info'));
    document.querySelectorAll('.cont-box').forEach(hideDisplayImportant);
})();

