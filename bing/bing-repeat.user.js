// ==UserScript==
// @name         Bing Search Repeat
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.1
// @match        https://www.bing.com/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/bing-repeat.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/bing-repeat.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Bing Search Repeat script loaded");

    const CSV_URL = 'https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/search-queries.csv';
    const STORAGE_KEY = 'bing-repeat-last-id';
    const searchTimes = 90; // 任意の回数に変更
    const interval = 5000; // 検索実行までの待機時間（ミリ秒）

    function parseCSV(text) {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const cols = line.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h.trim()] = cols[i].trim());
            return obj;
        });
    }

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

    // メイン処理
    fetch(CSV_URL)
        .then(res => res.text())
        .then(csvText => {
            const queries = parseCSV(csvText);
            let lastId = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

            let nextId = lastId + 1;
            if (nextId > searchTimes) return;

            const nextQuery = queries.find(q => parseInt(q.id, 10) === nextId);
            if (!nextQuery) return;

            localStorage.setItem(STORAGE_KEY, nextId);

            setTimeout(() => {
                Promise.all([
                    waitForElement("#sb_form_q"),
                    waitForElement("#sb_form")
                ]).then(([input, form]) => {
                    console.log(`Searching for: ${nextQuery.query}`);
                    input.value = nextQuery.query;
                    form.submit();
                });
            }, interval);
        });
})();