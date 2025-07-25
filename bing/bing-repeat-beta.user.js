// ==UserScript==
// @name         Bing Search Repeat Beta
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://www.bing.com/*
// @grant        none
// @run-at       document-end
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

    // メイン処理
    fetch(CSV_URL)
        .then(res => res.text())
        .then(csvText => {
            console.log("CSV data fetched successfully");
            console.log(csvText);
            const queries = parseCSV(csvText);
            let lastId = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

            let nextId = lastId + 1;
            if (nextId > searchTimes) return;

            const nextQuery = queries.find(q => parseInt(q.id, 10) === nextId);
            if (!nextQuery) return;

            localStorage.setItem(STORAGE_KEY, nextId);

            setTimeout(() => {
                const input = document.querySelector("#sb_form_q");
                const form = document.querySelector("#sb_form");
                if (input && form) {
                    console.log(`Searching for: ${nextQuery.query}`);
                    input.value = nextQuery.query;
                    form.submit();
                } else {
                    console.warn("InputまたはFormが見つかりませんでした。");
                }
            }, interval);
        });
})();