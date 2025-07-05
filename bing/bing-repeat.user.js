// ==UserScript==
// @name         Bing Search Repeat
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      0.2
// @match        https://www.bing.com/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/bing-repeat.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/bing-repeat.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const CSV_URL = "https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/bing/search-queries.csv";
    const REPEAT_PARAM = "repeat_idx";

    // クエリ配列を取得して実行
    fetch(CSV_URL)
        .then(res => res.text())
        .then(text => {
            // CSVをパース
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',');
            const queryIdx = headers.indexOf('query');
            if (queryIdx === -1) return;

            const queries = lines.slice(1).map(line => line.split(',')[queryIdx]);
            // URLパラメータでインデックス管理
            const url = new URL(window.location.href);
            let idx = parseInt(url.searchParams.get(REPEAT_PARAM) || "0", 10);

            if (idx < queries.length) {
                // 検索実行
                document.querySelector("#sb_form_q").value = queries[idx];
                document.querySelector("#sb_form").submit();

                // 次の検索のためにインデックスを増やしてリダイレクト
                url.searchParams.set(REPEAT_PARAM, idx + 1);
                setTimeout(() => {
                    window.location.href = url.toString();
                }, 2000); // 2秒後に次の検索
            } else {
                alert("検索完了");
            }
        });
})();