// ==UserScript==
// @name         X Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.0
// @match        https://x.com/*
// @description  A userscript to restyle X (formerly Twitter) by hiding ads and other elements.
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/x_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/x_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("X Restyle script loaded");

    const selectorsCommon = [
        'div[data-testid="super-upsell-UpsellButtonRenderProperties"]',
        'div[data-testid="verified_profile_visitor_upsell"]',
        'div[aria-label="タイムライン: 話題を検索"]',
        'a[href="/messages"]',
        'a[href="/i/grok"]',
        'a[href="/i/premium_sign_up"]',
        'a[href="/i/verified-orgs-signup"]',
        'a[href="/i/monetization"]',
        'a[href="/jobs"]',
        'a[href="https://ads.x.com/?ref=gl-tw-tw-twitter-ads-rweb"]',
        'article[data-testid="tweet"]:has(div[data-testid="placementTracking"])',
    ];

    const selectorsMobile = [
        'a[href="/compose/post"]',
        'button[aria-label="プロフィールの要約"]',
        'button[data-testid="sendDMFromProfile"]',
    ];

    const selectorsDesktop = [
        'div[data-testid="GrokDrawer"]',
        'a[aria-label="X"]',
        'a[href="/i/spaces/start"]',
        'div[data-testid="sidebarColumn"]',
        'div[data-testid="ScrollSnap-SwipeableList"]',
        'div[aria-label="ホームタイムライン"] > div:has(button[data-testid="tweetButtonInline"])',
        'div[aria-label="ホームタイムライン"] > div:has(div[contenteditable="true"][role="textbox"])',
    ];

    // 画面幅でモバイルかデスクトップか判定
    const isMobile = window.innerWidth <= 600;

    let selectors = selectorsCommon;
    if (isMobile) {
        selectors = selectors.concat(selectorsMobile);
    } else {
        selectors = selectors.concat(selectorsDesktop);
    }

    const hiddenStyle = document.createElement('style');
    hiddenStyle.id = 'x-hidden-style';
    hiddenStyle.textContent = `
        ${selectors.join(',\n')} {
            display: none !important;
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(hiddenStyle);

    const restyleCss = `
        .r-1ye8kvj {
            max-width: 60vw !important;
        }
    `;

    const reStyle = document.createElement('style');
    reStyle.textContent = restyleCss;
    document.head.appendChild(reStyle);

    // 「プロモーション」ラベルを含むspanを非表示にする
    function hidePromotionSpans() {
        document.querySelectorAll('article').forEach(article => {
            const found = Array.from(article.querySelectorAll('span')).some(span =>
                span.textContent === 'プロモーション' || span.textContent === 'Sponsored'
            );
            if (found) {
                article.style.display = 'none';
            }
        });
    }

    // ページロード時と動的追加時に実行
    hidePromotionSpans();
    const observer = new MutationObserver(hidePromotionSpans);
    observer.observe(document.body, { childList: true, subtree: true });
})();