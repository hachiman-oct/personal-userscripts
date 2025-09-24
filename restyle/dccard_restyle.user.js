// ==UserScript==
// @name         DC Card Restyle
// @namespace    https://github.com/hachiman-oct/
// @author       hachiman-oct
// @license      MIT
// @version      1.3
// @match        https://club.dccard.co.jp/*
// @downloadURL  https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/dccard_restyle.user.js
// @updateURL    https://raw.githubusercontent.com/hachiman-oct/personal-userscripts/main/restyle/dccard_restyle.user.js
// @description  A userscript to restyle DC Card pages by hiding ads and other elements
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    console.log("Game8 Restyle script loaded");

    const pageMap = {
        login: '/service/members/htmls/prp/cookie/index.htm',
        second: '/service/members/asps/AddNinsyoItem.asp'
    };

    if (location.pathname.includes(pageMap.login)) {
        console.log("Login page detected");

        // --- 前回の処理：特定のtd内の要素を非表示にする ---

        // 1. 目的の<td>要素を取得
        const tdElement = document.querySelector("body > form > center > table:nth-child(5) > tbody > tr:nth-child(1) > td");

        if (tdElement) {
            // 2. 非表示にしたいノードを格納する配列
            const nodesToHide = [];

            // 3. <td>の直下の子ノードをループ処理
            tdElement.childNodes.forEach(node => {
                // ノードがテキスト、BRタグ、またはSMALLタグの場合
                if (node.nodeType === 3 || (node.nodeType === 1 && (node.tagName === 'BR' || node.tagName === 'SMALL'))) {
                    nodesToHide.push(node);
                }
            });

            // 4. 隠したいノードを<span>で囲み、そのspanを非表示にする
            if (nodesToHide.length > 0) {
                const wrapper = document.createElement('span');
                wrapper.style.display = 'none';
                nodesToHide.forEach(node => wrapper.appendChild(node));
                // <td>の先頭に、隠したい要素をまとめたwrapperを追加
                tdElement.prepend(wrapper);
            }
        }


        // --- 今回の追加処理：全てのtableからwidth属性を削除 ---

        // 1. ページ内の全ての<table>要素を取得
        const allTables = document.querySelectorAll('table');

        // 2. 取得した各テーブルに対して処理を実行
        allTables.forEach(table => {
            // width属性を削除
            table.removeAttribute('width');
        });

        const allInputs = document.querySelectorAll('input');

        allInputs.forEach(input => {
            // type属性がhiddenのものを削除
            input.removeAttribute('style');
            input.removeAttribute('width');
            input.removeAttribute('height');
            input.removeAttribute('size');
        });

        const allImages = document.querySelectorAll('img');

        allImages.forEach(img => {
            // width属性とheight属性を削除
            img.removeAttribute('width');
            img.removeAttribute('height');
        });

        const allTds = document.querySelectorAll('td');

        allTds.forEach(td => {
            // width属性を削除
            td.removeAttribute('width');
        });

        const css = `
        body > form > center > table:nth-child(5) > tbody > tr:nth-child(2),
        body > form > center > table:nth-child(5) > tbody > tr:nth-child(3) {display: none !important;}
        br {display:none;}
        table {width: 90%;}
        input {font-size: 3rem;}
        input[type="image"] {width: 10rem}
        td {padding: 1rem 0 1rem 0}
        td > img {display:none;}
        form > center {margin-top: 30vh;}
        form > center > img {width: 90%}
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);


        const inputId = document.querySelector('input[name="user_id_input"]');
        if (inputId) {
            inputId.setAttribute('placeholder', 'user_id');
        }

        const inputPass = document.querySelector('input[name="user_password_input"]');
        if (inputPass) {
            inputPass.setAttribute('placeholder', 'password');
        }
    }

    if (location.pathname.includes(pageMap.second)) {
        console.log("Second page detected");

        const selectors = [
            'div.tel',
            'div.rightCont',
            'div.birth > p',
            'div.birth > ul',
        ];

        const style = document.createElement('style');
        style.id = 'amazon-adblock-styles';
        style.textContent = `
        ${selectors.join(',\n')} {
            display: none !important;
            visibility: hidden !important; /* display:noneが効かない場合のための予備 */
        }
        `;
        document.head.appendChild(style);

        const textInputs = document.querySelectorAll('input[type="text"]');

        // 見つかったすべての要素に対して処理を繰り返す
        textInputs.forEach(input => {
            // type属性を"number"に変更
            input.type = 'number';

            // inputmode属性を"numeric"に設定
            input.setAttribute('inputmode', 'numeric');
        });
    }
})();