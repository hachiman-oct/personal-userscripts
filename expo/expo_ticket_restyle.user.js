// ==UserScript==
// @name         Expo Ticket Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.2
// @match        https://ticket.expo2025.or.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Expo Ticket Restyle script loaded");

    const isMyTicket = location.pathname === '/myticket/' || location.pathname === '/myticket/index.html';

    if (!isMyTicket) {
        console.log("This script is only for the My Ticket page.");
        return;
    }

    console.log("My Ticket page detected");

    const intervalId = setInterval(() => {
        // すべての .message_content.paragraph 要素を非表示にする
        document.querySelectorAll(".message_content.paragraph").forEach(el => {
            // console.log("Hiding element:", el); // デバッグ用に残すことも可能
            el.style.display = "none";
        });

        // すべての h1 要素を非表示にする
        document.querySelectorAll('h1').forEach(el => {
            // console.log("Hiding element:", el); // デバッグ用に残すことも可能
            el.style.display = "none";
        });

        // すべての .style_main__mt6v9 details 要素を開いた状態にする
        document.querySelectorAll('.style_main__mt6v9 details').forEach(detail => {
            detail.open = true;
        });

    }, 100); // 100ミリ秒ごとに実行

    // 2秒後（2000ミリ秒後）に繰り返し処理を停止
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("処理を停止しました。");
    }, 2000);
})();