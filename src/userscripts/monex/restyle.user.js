// ==UserScript==
// @name         Monex Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.3.1
// @include      https://*.monex.co.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/monex/restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/monex/restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    /**
     * ページ全体に適用するCSSルールを<style>タグとして<head>に追加します。
     * @param {string} css - 適用するCSSルール文字列
     */
    function addGlobalStyle(css) {
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    }

    const pageMap = {
        login: '/pc/ITS/login/',
        home: '/pc/servlet/ITS/home/Announce',
        CheckMajorCustmer: '/pc/servlet/ITS/login/CheckMajorCustmer',
    };

    // 非表示にするハンバーガーメニューのID
    const targetIds = [3, 4, 6, 7, 9, 10, 16, 17, 20];
    const currentPath = location.pathname;

    // サイト全体で共通の非表示セレクタ
    const commonSelectors = [
        ...targetIds.map(id => `ul.list-group.hamburger li:has(a[href="#id${id}"])`),
        'li.list-group-item2.lp15.rp0.group1.notToggleLink.sp-menu-font16',
        'div#appBanner'
    ];

    // ページ固有の非表示セレクタ
    let pageSpecificSelectors = [];

    if (currentPath.includes(pageMap.login)) {
        console.log("Login page detected");
        pageSpecificSelectors = [
            'p.full_SP:has(img[src="https://info.monex.co.jp/image/security/measure/phishing/fcsp_phishing.png"])',
            'form#contents > dl',
            'div.divider.txt-center',
            'form#contents > p:has(a[onclick="submitDummmyBtn()"])'
        ];
    } else if (currentPath.includes(pageMap.home) || currentPath.includes(pageMap.CheckMajorCustmer)) {
        console.log("Home page detected");
        pageSpecificSelectors = [
            'div.box-zabton.type-notice.bm10:has(a[href="https://info.monex.co.jp/service/d-account-linkage/index.html"])'
        ];
    }

    // 共通セレクタとページ固有セレクタをすべて結合
    const allSelectors = [...commonSelectors, ...pageSpecificSelectors];

    if (allSelectors.length > 0) {
        // 結合したセレクタリストから単一のCSSルールを生成
        const cssRule = `
            ${allSelectors.join(',\n')} {
                display: none !important;
            }
        `;
        // CSSルールを<head>に一度だけ挿入
        addGlobalStyle(cssRule);
    }
})();