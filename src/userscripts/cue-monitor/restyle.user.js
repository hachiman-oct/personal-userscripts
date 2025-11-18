// ==UserScript==
// @name         Cue Monitor Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.1
// @match        https://*.cue-monitor.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/cue-monitor/cue-monitor_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/src/userscripts/cue-monitor/cue-monitor_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(async function () {
    'use strict';

    console.log("Cue Monitor Restyle script loaded");

    // --- ユーティリティ関数: 指定した要素が出るまで待つ ---
    const waitForElement = (selector) => {
        return new Promise(resolve => {
            // 1. すでに存在しているかチェック
            const existingElement = document.querySelector(selector);
            if (existingElement) {
                return resolve(existingElement);
            }

            // 2. 存在しない場合、DOMの変更を監視する
            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element); // 要素が見つかったらPromiseを解決
                    observer.disconnect(); // 監視を終了
                }
            });

            // body全体を監視対象にする
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    };

    const pageMap = {
        answer: '/ans/pc/',
        entrance: '/ans/entrance/',
        mypage: '/sp/mypage/'
    };

    if (location.pathname.includes(pageMap.answer)) {
        console.log("Answer page detected");

        const css = `
        td.itile_cate_default,
        li.next-button,
        input[type='button'],
        table.qb {
            background: none !important;
        }
        td.itile_cate_select {
            background-image: none !important;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    } else if (location.pathname.includes(pageMap.entrance)) {
        const selector = 'section div.button.inner';

        console.log("ボタンの出現を待機しています...");

        // ボタンが出るまでここで処理が止まります
        const button = await waitForElement(selector);

        // 出現したらクリック
        console.log("ボタンを検出しました。クリックします。");
        button.click();
    } else if (location.pathname.includes(pageMap.mypage)) {
        console.log("My Page Top detected");

        document.querySelector("a.navbar-brand").href = `mytop.html`;

        const css = `
        div.mt05.ml10:has(img[src="../../common/images/icon-locked.png"]),
        nav#globalnav {
            display: none;
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();
