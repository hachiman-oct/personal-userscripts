// ==UserScript==
// @name         Monex Fund Order Sum with Clipboard Copy
// @namespace    http://tampermonkey.net/
// @version      1.1
// @include      https://mxp1.monex.co.jp/pc/servlet/ITS/fund/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // 親要素（表示対象）の取得
    const container = document.querySelector("#gn_service-lm_order > div.main");
    if (!container) {
        console.warn("親要素が見つかりませんでした。");
        return;
    }

    // フォーム要素（form:nth-child(2)）の取得
    const formElement = container.querySelector(".order-inquiry-body");
    if (!formElement) {
        console.warn("対象のフォーム要素が見つかりませんでした。");
        return;
    }

    // テーブル要素の取得
    const tables = container.querySelectorAll(".table-cmn-cardbox");
    const { total, expiration  }= calculateTotalAmount(tables);

    // 合計金額表示エリアを生成
    const totalDisplay = document.createElement("div");
    totalDisplay.id = "total-sum-display";
    totalDisplay.style.margin = "1em";
    totalDisplay.style.fontWeight = "bold";
    totalDisplay.textContent = "合計金額: " + total.toLocaleString() + "円";

    // クリップボードコピー用ボタンを生成
    const copyButton = document.createElement("button");
    copyButton.id = "copy-button";
    copyButton.textContent = "Copy to Clipboard";
    copyButton.style.marginLeft = "1em";

    // ボタンのクリックイベントの設定
    copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(total).then(function () {
            // ボタンのテキストを "copied" に一時変更し、2秒後に元に戻す
            const originalText = copyButton.textContent;
            copyButton.textContent = "Copied";
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 500);
        }, function (err) {
            console.error("コピーに失敗しました:", err);
        });
    });

    // フォーム要素の直後に、合計金額表示エリアとボタンを追加
    const searchBtn = document.querySelector('[name="search"]');
    totalDisplay.appendChild(copyButton);
    searchBtn.appendChild(totalDisplay);


    // 失効情報
    const css = document.createElement("style");
    css.innerHTML = `
        .expired-status {
            color: #ff0000; /* 赤色の文字 */
        }
        .expired-order {
            background-color: #ffe6e6; /* 薄い赤色の背景 */
        }
    `;
    document.head.appendChild(css);

    const hasExpiration = expiration.length;
    if (hasExpiration > 0) {
        alert(`失効した注文が${hasExpiration}件あります。詳細はテーブルを確認してください`);
    }


    /**
     * 指定されたテーブル要素から有効な買付注文の合計金額を計算する
     * @param {NodeListOf<Element>} tables - 計算対象のテーブル要素リスト
     * @returns {number} 合計金額
     */
    function calculateTotalAmount(tables) {
        let sum = 0;
        const validStatuses = ["約定済", "受付済", "受付中"];
        const expiration = []; // 失効テーブル格納用

        tables.forEach(table => {
            const orderTypeElem = table.querySelector(".gainUx");
            if (!orderTypeElem) return;
            const orderType = orderTypeElem.textContent;
            if (!orderType.includes("買付")) return;

            // 注文ステータスの取得
            const siblingOrderStatus = Array.from(table.querySelectorAll("*")).find(el => el.textContent.trim() === "注文状態");
            const orderStatus = siblingOrderStatus ? siblingOrderStatus.nextElementSibling : null;
            if (!orderStatus) return;
            const orderStatusText = orderStatus.textContent.trim();

            // 失効の場合はexpirationに追加
            if (orderStatusText === "失効") {
                orderStatus.classList.add("expired-status");
                table.classList.add("expired-order");
                expiration.push(table);
                return;
            }

            // 有効な注文ステータスかどうかを確認
            if (!validStatuses.includes(orderStatusText)) return;

            // 金額の取得
            const siblingOrderAmount = Array.from(table.querySelectorAll("*")).find(el => el.textContent.trim() === "金額/口数");
            const orderAmount = siblingOrderAmount ? siblingOrderAmount.nextElementSibling : null;
            if (!orderAmount) return;
            const orderAmountText = orderAmount.textContent.trim();
            // 金額テキストから数値を抽出して合計に加算
            const parsedAmount = parseAmount(orderAmountText);
            if (!isNaN(parsedAmount)) {
                sum += parsedAmount;
            } else {
                console.warn(`金額のパースに失敗しました: ${orderAmountText}`);
            }
        });
        return {
            total: sum,
            expiration: expiration,
        }
    }

    /**
     * 金額テキスト（例："123,456円"）から数値を抽出して返す
     * @param {string} text - 金額を表す文字列
     * @returns {number} 数値に変換された金額
     */
    function parseAmount(text) {
        const cleanedText = text.replace(/,/g, '').replace("円", "").trim();
        return Number(cleanedText);
    }
})();