// ==UserScript==
// @name         Adblock
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @description  A userscript to block common ad elements across various websites.
// @license      MIT
// @version      0.2
// @match        *://*/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/adblock.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/adblock.user.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const styleId = 'adblock-common-styles';

    if (document.getElementById(styleId)) {
        return;
    }

    const frameLocation = (window.self === window.top) ? 'Top frame' : `Iframe (${window.location.href})`;
    console.debug(`Adblock script loaded in: ${frameLocation}`);

    // 非表示にする広告要素のセレクターリスト
    const adSelectors = [
        '[class^="ad-"]',
        '[id^="ad-"]',
        '[id*="-ads-"]',
        '[id*="_ads_"]',
        '[class*="-ads-"]',
        '[class*="_ads_"]',
        '[id^="google_ads"]',
        '[class^="ads"]',
        '[class*="glssp"]',
        '[id*="glssp"]'
    ];

    // セレクターリストを結合してCSSルールを生成
    const commonStyles = `
    ${adSelectors.join(',\n    ')} {
        display: none !important;
    }
    `;

    // GM_addStyleでスタイルを追加し、戻り値のstyle要素にIDを付与する
    const styleElement = GM_addStyle(commonStyles);
    styleElement.id = styleId;


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