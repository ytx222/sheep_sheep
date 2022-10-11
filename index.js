import { config } from "./config.js";
import {
    createCards,
    cardToMap,
    randomCard,
    cards,
    clickCard,
    cardToCandidate,
    gameStatus,
    randomCardCount,
    updateRandomCardCount,
} from "./game.js";

/**
 * @type {HTMLDivElement}
 */
export let gameMapEl = null;

/**
 * @type {HTMLDivElement}
 */
export let gameCandidateEl = null;

let style;

init();
function init() {
    updateRem();

    style = `
    --width: ${config.itemSize.width}rem;
    --height: ${config.itemSize.height}rem;
    --mapWidth: ${config.mapSize.width};
    --mapHeight: ${config.mapSize.height};
    visibility: visible;

    `;
    // 设置样式
    document.body.style = style;
    style += "--ms:var(--initEndMs);";
}

window.addEventListener("DOMContentLoaded", function () {
    gameMapEl = document.querySelector(".game-map");
    gameCandidateEl = document.querySelector(".game-candidate");

    gameMapEl.onclick = function (e) {
        if (gameStatus > 1) {
            return;
        }
        let path = e.path;
        if (path[1]?.classList?.contains("item")) {
            const el = path[1];
            // console.log("点击", el);
            const id = el.dataset.id;
            clickCard(id);
        }
    };

    gameMapEl.addEventListener(
        "transitionend",
        function (e) {
            if (gameStatus > 1) {
                return;
            }
            // console.warn('transitionend',e);
            // 一个元素可能会触发多次,所以只检测top变化的事件
            if (e.propertyName !== "top") return;
            let el = e.path[0];

            if (el?.classList?.contains("item")) {
                const id = el.dataset.id;
                cardToCandidate(id);
            }
        },
        true
    );

    document.querySelector("button.create").onclick = function () {
        console.log("创建卡牌");

        createCards();
    };

    document.querySelector("button.random").onclick = function () {
        console.log("开始随机");
        randomCard();
    };

    document.querySelector("button.append").onclick = function () {
        console.log("添加到地图");
        cardToMap();
    };

    document.querySelector("button.start-game").onclick = function () {
        createCards();
        randomCard();
        cardToMap();
        updateRandomCardCount(0)

        // 设置样式
        document.body.style = style;
    };
    document.querySelector(".setting").onclick = function () {
        console.log("点击设置");
    };
});

window.addEventListener("resize", updateRem);

function updateRem() {
    // rem 大小为屏幕宽度是1/20
    // 带间距定制版
    const { clientWidth: w, clientHeight: h } = document.documentElement;
    const wRem = (w - 32 - 30) / (config.mapSize.width * config.itemSize.width);
    // main 20  btn 42 start 54 剩余 32+ 32  间距 50
    const hRem =
        (h - 20 - 42 - 54 - 64 - 30) /
        ((config.mapSize.height + 1) * config.itemSize.height);

    let minRem = Math.min(hRem, wRem).toFixed(2);

    console.warn({ w, h, wRem, hRem, minRem });

    document.documentElement.style.fontSize = `${minRem}px`;
}
