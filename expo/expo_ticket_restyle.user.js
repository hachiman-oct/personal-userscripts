// ==UserScript==
// @name         Expo Ticket Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://ticket.expo2025.or.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket_restyle.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==


(function () {
    'use strict';

    console.log("Expo Ticket Restyle script loaded");

    document.querySelectorAll(".message_content.paragraph").forEach(el => {
        el.style.display = "none";
    });

    document.querySelectorAll('.style_main__mt6v9 details').forEach(detail => {
        detail.open = true;
    });
})();