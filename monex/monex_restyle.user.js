// ==UserScript==
// @name         Monex Restyle
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

    const pageMap = {
        home: '/pc/servlet/ITS/home/Announce',
        CheckMajorCustmer: '/pc/servlet/ITS/login/CheckMajorCustmer',
        asset: '/pc/servlet/ITS/asset/AmountList',
    };

    // ▼▼▼ ここに非表示にしたいIDの番号をカンマ区切りで入力 ▼▼▼
    const targetIds = [3, 4, 6, 7, 9, 10, 16, 17, 20];
    // ▲▲▲ ここまで ▲▲▲

    // targetIdsが空の場合は何もしない
    if (!targetIds || targetIds.length === 0) {
        return;
    }

    // 1. 各IDに対応するCSSセレクタのパーツを作成
    const selectors = targetIds.map(id =>
        `ul[class="list-group hamburger"] li:has(a[href="#id${id}"])`
    );

    // 2. セレクタのパーツをカンマで連結して、最終的なCSSルールを作成
    const cssRule = `
        ${selectors.join(',\n')},
        li[class="list-group-item2 lp15 rp0 group1 notToggleLink sp-menu-font16"] {
            display: none !important;
        }
    `;

    // 3. 作成したCSSを<style>タグとしてページの<head>に追加
    const styleElement = document.createElement('style');
    styleElement.textContent = cssRule;
    document.head.appendChild(styleElement);

    if (location.pathname.includes(pageMap.home) || location.pathname.includes(pageMap.CheckMajorCustmer)) {
        console.log("home page detected");

        const css = `
        div[id="m11AppBanner"][class="m11AppBanner mt-10"],
        img[src="https://info.monex.co.jp/news/image/2025/20250529_01/mypage.png"],
        div[class="box-zabton type-notice bm10"]:has(a[href="https://info.monex.co.jp/service/d-account-linkage/index.html"]),
        div[class="box-zabton type-notice bm10"]:has(a[href="https://info.monex.co.jp/security/measure/phishing.html#page07"]),
        ul[class="list-group hamburger"] li:has(a[href="#id4"]) {
            display: none !important;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    } else if (location.pathname.includes(pageMap.asset)) {
        console.log("asset page detected");

        const css = `
        div[class="zabton type-info type-firstblock"] {
            display: none !important;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();

