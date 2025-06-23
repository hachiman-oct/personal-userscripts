// ==UserScript==
// @name         Expo Visitors ナビ非表示
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Expo Visitors サイトのナビゲーションバーを非表示にします
// @match        https://www.expovisitors.expo2025.or.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const hideNav = () => {
        const nav = document.querySelector('nav[role="navigation"]');
        if (nav) {
            nav.style.display = "none";
        }
    };
    // ページ読み込み時
    hideNav();
    // SPA対応: ページ内容が動的に変わる場合にも対応
    const observer = new MutationObserver(hideNav);
    observer.observe(document.body, { childList: true, subtree: true });
})();