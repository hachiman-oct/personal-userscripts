// ==UserScript==
// @name         Adblock
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @description  A userscript to block common ad elements across various websites.
// @license      MIT
// @version      1.0
// @match        *://*/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/adblock.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/adblock.user.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 非表示にする広告要素のセレクターリスト
    const adSelectors = [
        '[class^="ad-"]',
        '[id^="ad-"]',
        '[id*="-ads-"]',
        '[id*="_ads_"]',
        '[class*="-ads-"]',
        '[class*="_ads_"]',
        '[id*="-ad-"]',
        '[id*="_ad_"]',
        '[class*="-ad-"]',
        '[class*="_ad_"]',
        '[id^="google_ads"]',
        '[class^="ads"]',
        '[class*="glssp"]',
        '[id*="glssp"]',
        'html[amp4ads] body',
        '#zucks_wipead',
        '[class^="adArea"]',
        '[class*="adContainer"]',
        '[class*="adBanner"]',
        '[class*="Yads"]',
        '[aria-label="広告"]',
        '[aria-label="Ads"]',
        '[data-layout="ad"]',
        '[class*="AdHolder"]',
        '[class^="AdHolder"]',
    ];

    // セレクターリストを結合してCSSルールを生成
    const commonStyles = `
    ${adSelectors.join(',\n    ')} {
        display: none !important;
    }
    `;

    const styleId = 'adblock-common-styles';
    const styleElement = document.createElement('style');
    styleElement.textContent = commonStyles;
    styleElement.id = styleId;
    document.head.appendChild(styleElement);


    // style属性を削除したいセレクターのリスト（拡張可能）
    const selectorsToRemoveStyle = [
        '.adsbygoogle',
        '.adsbygoogle-noablate',
    ];

    // 指定されたノードとその子孫からstyle属性を削除する関数
    const removeStyleFromNodes = (node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        selectorsToRemoveStyle.forEach(selector => {
            // 追加されたノード自体がセレクターに一致するかチェック
            if (node.matches(selector)) {
                node.removeAttribute('style');
            }
            // 追加されたノードの子孫をチェック
            node.querySelectorAll(selector).forEach(el => el.removeAttribute('style'));
        });
    };

    // MutationObserverで動的に追加される要素を監視
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach(removeStyleFromNodes);
        });
    });

    // ドキュメント全体の変更（要素の追加）の監視を開始
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // スクリプト実行時に既に存在する要素に対しても処理を実行
    removeStyleFromNodes(document.documentElement);
})();