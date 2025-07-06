// ==UserScript==
// @name         Expo Ticket Automation
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://ticket.expo2025.or.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket.user.js
// @grant        none

// ==/UserScript==

(function () {
    'use strict';

    const pageMap = {
        ticket_selection: '/ticket_selection/',
        agent_ticket: '/agent_ticket/',
    };

    window.addEventListener('DOMContentLoaded', function() {
        // ここにメイン処理を書く
        if (location.pathname === pageMap.agent_ticket) {
            inputAgentTicketID();
        } else if (location.pathname === pageMap.ticket_selection) {
            const selectedTicket = document.querySelectorAll('[data-list-type="myticket_send"] li').length;
            if (selectedTicket == 1) {
                const addBtn = document.querySelector("a.type1");
                if (addBtn) {
                    addBtn.click();
                }
            } else if (selectedTicket > 1) {
                selectTickets();
            }
        }
    });

    function inputAgentTicketID() {
        console.log("inputAgentTicketID function called");

        const agent_ticket_id = '4XBNNK525F';
        const inputElement = document.querySelector("input#agent_ticket_id_register");
        const buttonElement = document.querySelector("button.style_main__register_btn__FHBxM");

        if (!inputElement || !buttonElement) {
            console.error("No input or button found.");
            return;
        }

        // Reactの入力値を強制的に設定
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        nativeInputValueSetter.call(inputElement, agent_ticket_id);
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);

        setTimeout(() => {
            console.log("Clicking the button...");
            buttonElement.click();

            // agentTicketFigureが出てくるまで待つ
            const waitForFigure = setInterval(() => {
                const agentTicketFigure = document.querySelector("div.fig-ticket");
                if (agentTicketFigure) {
                    clearInterval(waitForFigure);
                    const addBtn = document.querySelectorAll("button.basic-btn.type2")[1];
                    if (addBtn) {
                        addBtn.click();
                    }
                }
            }, 100);
        }, 100);
    }

    function selectTickets() {
        console.log("selectTickets function called");

        const selectAllBtn = document.querySelector("label.select-all");
        if (selectAllBtn) {
            selectAllBtn.click();
        } else {
            console.error("No 'select all' button found.");
        }
        const toSendBtn = document.querySelector("a.to-send.type2");
        if (toSendBtn) {
            setTimeout(() => {
                toSendBtn.click();
            }, 100);
        } else {
            console.error("No 'to send' button found.");
        }
    }
})();