// ==UserScript==
// @name         Expo Ticket Automation
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.0
// @description  Automates the ticket selection and agent ticket input process on Expo 2025
// @match        https://ticket.expo2025.or.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/expo/expo_ticket.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    console.log("Expo Ticket Automation script loaded");

    const pageMap = {
        ticket_selection: '/ticket_selection/',
        agent_ticket: '/agent_ticket/',
    };

    // waitForElement関数は不要になったため削除

    async function inputAgentTicketID() {
        console.log("inputAgentTicketID function called");
        const agent_ticket_id = '4XBNNK525F';
        setTimeout(() => {
            const inputElement = document.querySelector("input#agent_ticket_id_register");
            const buttonElement = document.querySelector("button.style_main__register_btn__FHBxM");
            if (inputElement && buttonElement) {
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
                    setTimeout(() => {
                        const agentTicketFigure = document.querySelector("div.fig-ticket");
                        const addBtn = document.querySelectorAll("button.basic-btn.type2")[1];
                        if (agentTicketFigure && addBtn) {
                            addBtn.click();
                        }
                    }, 500);
                }, 100);
            } else {
                console.warn("inputElementまたはbuttonElementが見つかりませんでした。");
            }
        }, 5000);
    }

    async function selectTickets() {
        console.log("selectTickets function called");
        setTimeout(() => {
            const selectAllBtn = document.querySelector("label.select-all");
            if (selectAllBtn) {
                selectAllBtn.click();
                setTimeout(() => {
                    const toSendBtn = document.querySelector("a.to-send.type2");
                    if (toSendBtn) {
                        toSendBtn.click();
                    } else {
                        console.error("No 'to send' button found.");
                    }
                }, 100);
            } else {
                console.error("No 'select all' button found.");
            }
        }, 5000);
    }

    function observeAndRun(mainFunc) {
        let lastPath = location.pathname;
        let running = false;

        async function wrappedMain() {
            if (running) return;
            running = true;
            try {
                await mainFunc();
            } finally {
                running = false;
            }
        }

        // 初回実行
        wrappedMain();

        // bodyの変化を監視
        const observer = new MutationObserver(() => {
            // パスが変わった時や、必要な要素が消えた→現れた時に再実行
            if (location.pathname !== lastPath) {
                lastPath = location.pathname;
                wrappedMain();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    async function mainProcess() {
        if (location.pathname.includes(pageMap.agent_ticket)) {
            await inputAgentTicketID();
        } else if (location.pathname.includes(pageMap.ticket_selection)) {
            setTimeout(() => {
                const ticketList = document.querySelector('[data-list-type="myticket_send"]');
                if (ticketList) {
                    const selectedTicket = ticketList.querySelectorAll('li').length;
                    if (selectedTicket == 1) {
                        const addBtn = document.querySelector("a.type1");
                        if (addBtn) addBtn.click();
                    } else if (selectedTicket > 1) {
                        selectTickets();
                    }
                } else {
                    console.error("ticketListが見つかりませんでした。");
                }
            }, 5000);
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        observeAndRun(mainProcess);
    });
})();