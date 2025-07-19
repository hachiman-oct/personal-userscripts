// ==UserScript==
// @name         AMZN Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @description  A userscript to block and restyle elements on AMZN pages.
// @license      MIT
// @version      0.2
// @match        https://www.amazon.co.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/amzn_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/adblock/amzn_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Amazon Adblock & Restyle script loaded");

    // 広告の可能性がある要素を非表示にするCSSセレクター
    // :has() を使用して、内部に「スポンサー」または「Sponsored」のテキストを持つ要素をターゲットにします
    const adSelectors = [
        // 通常のスポンサー商品
        'div.s-result-item.sg-col.s-widget.s-widget-spacing-small',
        // ビデオ広告など、data-* 属性に "sponsored" を含むもの
        'div.s-result-item.sg-col.s-widget.s-widget-spacing-large:not(.s-widget-no-divider)',
        // その他の広告コンテナの可能性
        'div.AdHolder',
    ];

    // スタイルシートを作成してページに適用
    const style = document.createElement('style');
    style.id = 'amazon-adblock-styles';
    style.textContent = `
        ${adSelectors.join(',\n')} {
            display: none !important;
            visibility: hidden !important; /* display:noneが効かない場合のための予備 */
        }
    `;
    document.head.appendChild(style);

    console.log("Amazon adblock styles applied.");
})();