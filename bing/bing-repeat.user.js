// ==UserScript==
// @name         Bing Search Repeat
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.1
// @match        https://www.bing.com/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/bing-repeat.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/bing-repeat.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const CSV_URL = 'https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/search-queries.csv';
    const STORAGE_KEY = 'bing-repeat-last-id';
    const searchTimes = 90; // 任意の回数に変更
    const interval = 5000; // 検索実行までの待機時間（ミリ秒）

    // CSVをパースする関数
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
            const queries = parseCSV(csvText);
            let lastId = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

            // 次の検索IDを決定
            let nextId = lastId + 1;
            if (nextId > searchTimes) return; // searchTimes回で終了

            const nextQuery = queries.find(q => parseInt(q.id, 10) === nextId);
            if (!nextQuery) return;

            // localStorageに進捗を記録
            localStorage.setItem(STORAGE_KEY, nextId);

            // intervalミリ秒待ってから検索実行
            setTimeout(() => {
                const input = document.querySelector("#sb_form_q");
                const form = document.querySelector("#sb_form");
                if (input && form) {
                    input.value = nextQuery.query;
                    form.submit();
                }
            }, interval);
        });
})();