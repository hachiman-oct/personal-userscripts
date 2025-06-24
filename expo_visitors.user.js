// ==UserScript==
// @name         Expo Visitors ナビ非表示
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.4
// @description  Expo Visitors サイトのナビゲーションバーを非表示にします
// @match        https://www.expovisitors.expo2025.or.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo_visitors.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo_visitors.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // スタイルを追加して、余白を削除
    const css = `
    .wrapper, .wrapper.detail-page {margin-top: 80px;}
    .slot[data-v-6ed96483] {padding-top: 80px !important;}
    .venue_map .contents[data-v-0f08ea17] {height: 100dvh;}
    #ZMap > div {height: 100dvh}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // #ZMap > div の height 属性を直接削除（/map ページのみ）
    const removeZMapDivHeight = () => {
        if (location.pathname === '/map') {
            const zmapDiv = document.querySelector('#ZMap > div');
            if (zmapDiv && zmapDiv.style.height) {
                zmapDiv.style.removeProperty('height');
            }
        }
    };
    // 初回実行
    removeZMapDivHeight();
    // SPA対応: DOM変化時にも実行
    const zmapObserver = new MutationObserver(removeZMapDivHeight);
    zmapObserver.observe(document.body, { childList: true, subtree: true });

    const hideNav = () => {
        const nav = document.querySelector('nav[role="navigation"]');
        if (nav) {
            const div = nav.querySelector(".navigation__scroll");
            if (div) {
                div.style.display = "none";
            }
        }
    };
    // ページ読み込み時
    hideNav();
    // SPA対応: ページ内容が動的に変わる場合にも対応
    const observer = new MutationObserver(hideNav);
    observer.observe(document.body, { childList: true, subtree: true });
})();