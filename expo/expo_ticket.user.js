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
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    console.log("Expo Ticket Automation script loaded");

    const pageMap = {
        ticket_selection: '/ticket_selection/',
        agent_ticket: '/agent_ticket/',
    };

    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const interval = 100;
            let elapsed = 0;
            const timer = setInterval(() => {
                const el = document.querySelector(selector);
                if (el) {
                    console.log('Element found:', selector);
                    clearInterval(timer);
                    resolve(el);
                } else if ((elapsed += interval) >= timeout) {
                    clearInterval(timer);
                    reject(new Error('Element not found: ' + selector));
                }
            }, interval);
        });
    }

    async function inputAgentTicketID() {
        console.log("inputAgentTicketID function called");

        const agent_ticket_id = '4XBNNK525F';
        const inputElement = await waitForElement("input#agent_ticket_id_register");
        const buttonElement = await waitForElement("button.style_main__register_btn__FHBxM");

        // Reactの入力値を強制的に設定
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        nativeInputValueSetter.call(inputElement, agent_ticket_id);
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);

        // ボタンが有効になるまで待ってクリック
        setTimeout(() => {
            console.log("Clicking the button...");
            buttonElement.click();
        }, 100);

        // agentTicketFigureが出てくるまで待つ
        try {
            const agentTicketFigure = await waitForElement("div.fig-ticket");
            const addBtn = document.querySelectorAll("button.basic-btn.type2")[1];
            if (addBtn) {
                addBtn.click();
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function selectTickets() {
        console.log("selectTickets function called");

        const selectAllBtn = await waitForElement("label.select-all");
        selectAllBtn.click();

        try {
            const toSendBtn = await waitForElement("a.to-send.type2");
            setTimeout(() => {
                toSendBtn.click();
            }, 100);
        } catch (e) {
            console.error("No 'to send' button found.");
        }
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
        if (location.pathname === pageMap.agent_ticket) {
            await inputAgentTicketID();
        } else if (location.pathname === pageMap.ticket_selection) {
            const ticketList = await waitForElement('[data-list-type="myticket_send"]');
            const selectedTicket = ticketList.querySelectorAll('li').length;
            if (selectedTicket == 1) {
                const addBtn = await waitForElement("a.type1");
                addBtn.click();
            } else if (selectedTicket > 1) {
                await selectTickets();
            }
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        observeAndRun(mainProcess);
    });
})();