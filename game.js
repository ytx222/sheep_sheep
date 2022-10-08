import { config, images, updateImages } from "./config.js";
import { gameCandidateEl, gameMapEl } from "./index.js";

/**
 * 0: 未开始
 * 1: 游戏中
 * 8: 已失败
 * 9: 已成功
 */
export let gameStatus = 0;

const getId = (() => {
    let id = 0;
    return () => id++;
})();

export class Card {
    constructor(type) {
        // 唯一id
        this.id = getId();
        // 类型,7种之一
        this.type = type;
        /** @type {CardStatus} */
        this.status = 0;

        // x,y先设置为初始值,等待调用的时候传递具体的位置
        this.x = 0;
        this.y = 0;
        this.layer = 0;

        // 渲染后参数
        // this.left = 0;
        // this.top = 0;
        this.el = null;
        // 当元素被移动到候选区后,el被删除,复制出一份元素添加到candidateEl
        this.candidateEl = null;
        /** 是否被覆盖 */
        this.covered = false;
        /**
         *  @type {Card[]} 保存直接覆盖当前卡片的的卡片
         *  具体算法是一整个(1*1)大小的面积被完全覆盖 请看 initCoverState
         */
        this.byCovers = [];
        /** @type {Card[]}  保存自身覆盖的卡片,这个其实只是为了和byCovers关联形成双向引用 */
        this.covers = [];
    }

    /**
     * 判断item是否遮盖了自身
     * @param {Card} item
     */
    isCover(item) {
        // console.log(
        //     "isCover",
        //     this,
        //     item,
        //     Math.abs(item.x - this.x) < 1 && Math.abs(item.y - this.y) < 1
        // );

        if (item.layer <= this.layer)
            return alert("出错了,要对比的层级元素低于自身");
        return Math.abs(item.x - this.x) < 1 && Math.abs(item.y - this.y) < 1;
    }

    /**
     *
     * @param {MapItem} mapItem
     * @param {number} layer
     */
    toMap(mapItem, layer) {
        this.x = mapItem.x;
        this.y = mapItem.y;
        this.layer = layer;
        // 如果元素未创建,则创建一下
        if (this.status === 0) {
            const el = document.createElement("div");
            // 这里好像没必要,不过还是加上吧
            el.dataset.id = this.id;
            el.className = this.covered ? "item covered" : "item";

            const inner = document.createElement("div");
            inner.className = "item-img";
            inner.style.backgroundImage = `url("./img/");`;
            inner.style = `background-image: url(./img/${images[this.type]});`;
            // console.warn(inner);
            el.appendChild(inner);
            gameMapEl.appendChild(el);
            this.el = el;
            this.status = 1;
        }

        mapItem.cardItem = this;

        this.el.style.zIndex = layer;

        // this.

        this.el.style.left = this.x * config.itemSize.width + "rem";
        this.el.style.top = this.y * config.itemSize.height + "rem";
        // 由于位置已经发生变化,清空覆盖链

        console.log("toMap");
    }
}

/**
 * @type {Card[]}
 */
export let cards = [];
/**
 * @type {MapLayer[]}
 */
export let currentMap = [];

export function createCards() {
    updateImages();
    // 先重置cards,candidates
    if (cards.length) {
        cards.forEach((e) => destroyCard(e, true));
        cards = [];
        candidates = [];
        gameCandidateEl.innerHTML = "";
    }

    currentMap = JSON.parse(JSON.stringify(config.map));
    const count = currentMap.reduce((prev, item) => prev + item.length, 0);
    if (count % 3 !== 0) {
        // return alert("该地图似乎有错误!");
        console.error("%c该地图似乎有错误!",'font-size:40px;');
    }
    //
    const len = count / 3;
    console.warn({ count, len });
    for (var i = 0; i < len; i++) {
        cards.push(
            //
            new Card(i % images.length),
            new Card(i % images.length),
            new Card(i % images.length)
        );
    }

    gameStatus = 1;

    console.warn("cards", cards);
}

export let randomCardCount = 0;
export const updateRandomCardCount = v => void (randomCardCount = v);
export function randomCard() {
    cards.sort((e) => (Math.random() > 0.5 ? 1 : -1));
    console.warn("randomCard", cards);
    randomCardCount++;

    // 遍历每一层
    // currentMap.forEach((layer, index) => {
    //     //遍历每一个
    //     layer.forEach((item) => {});
    // });
}

/**
 * 将卡牌添加到地图中
 */
export function cardToMap() {
    console.warn("cardToMap", currentMap);
    let i = 0;
    // 遍历每一层
    currentMap.forEach((layer, index) => {
        //遍历每一个
        layer.forEach((item) => {
            cards[i].toMap(item, index);
            i++;
        });
    });
    setTimeout(() => {
        initCoverState();
    }, 10);
}

/**
 * 初始化覆盖状态,初始化card的覆盖链
 */
function initCoverState() {
    console.log("initCoverState");
    // 先清空相关数据
    cards.forEach((e) => {
        e.covered = false;
        e?.el?.classList.remove("covered");
        e.covers = [];
        e.byCovers = [];
    });

    cards.forEach((card) => {
        const area = [card.x, card.y, card.x + 1, card.y + 1];
        // 从当前层的上一层开始,直到顶层
        for (let i = card.layer + 1; i < currentMap.length; i++) {
            // 一整个(1*1)大小的面积被完全覆盖
            // TODO: 这个算法好像有亿点点复杂,所以先不写,先把所有覆盖的都添加吧
            const layer = currentMap[i];

            card.byCovers.push(
                ...layer
                    .filter((item) => {
                        return card.isCover(item);
                    })
                    .map((e) => {
                        e.cardItem.covers.push(card);
                        return e.cardItem;
                    })
            );
        }
    });
    // for (let i = currentMap.length - 1; i > 0; i--) {
    //
    //
    //     const layer = currentMap[i];
    //     const nextLayer = currentMap[i - 1];
    //     const nextLayerCard = nextLayer.map((e) => e.cardItem);
    //     for (var j = 0; j < layer.length; j++) {
    //         const item = layer[j];
    //         const card = item.cardItem;
    //         // 遍历下一层,查找自身遮盖了下一层的那些元素,添加到 covers
    //         card.covers = nextLayerCard.filter((i) => {
    //             return i.isCover(item);
    //             // 判断是否遮盖了
    //         });
    //         console.warn(" card.covers =", card.covers);
    //     }
    // }

    cards.forEach((e) => {
        if (e.covers.length) {
            e.covers.forEach((item) => {
                // 如果这个元素还没有被设置为被覆盖,则设置一些
                if (!item.covered) {
                    item.covered = true;
                    item?.el?.classList.add("covered");
                }
            });
        }
    });
}

/***********************************
 *          工具方法
 **********************************/

/**
 * 销毁某个card,这个方法其实并不是删除,只是清除他自身的绑定关系
 */
function destroyCard(card, destroyCandidate = false) {
    card?.el?.parentElement.removeChild(card.el);
    card.el = null;
    // 解除候选区绑定
    if (destroyCandidate) {
        console.warn("card?.candidateEl", card, card?.candidateEl);
        card?.candidateEl?.parentElement.removeChild(card.candidateEl);

        const index = candidates.findIndex((e) => e.id == card.id);
        candidates.splice(index, 1);
    }
}
/**
 * 更新覆盖状态
 * @param {Card} card
 */
function updateCoverState(card) {
    // console.warn("updateCoverState", card);
    card.covers.forEach((item) => {
        // console.warn(item);
        // 如果这个卡已经被覆盖了
        if (item.covered) {
            // 检查是否可以取消覆盖
            if (item.byCovers.some((e) => e.status === 1)) {
                // 覆盖自身的所有卡片中有任意一个的状态是正常的
                return;
            }
            //可以,就取消覆盖
            item.covered = false;
            item?.el?.classList.remove("covered");
        }
    });
}

/***********************************
 *          候选区
 **********************************/

/** @type {Card[]} */
let candidates = [];

/**
 * 点击选中某个卡牌
 */
export function clickCard(id) {
    // 字符串和数字对比
    const item = cards.find((e) => e.id == id);
    // console.warn(item);
    // 没找到,就退出
    if (!item) return;
    // 如果元素被覆盖,则忽略
    if (item.covered) return;
    // 候选区是满了
    if (checkCandidateFull()) return;
    if (item.status === 1) {
        // 是正常状态,更改为候选区
        item.status = 2;
        const newEl = item.el.cloneNode(true);
        // console.log(newEl);
        item.candidateEl = newEl;
        gameCandidateEl.appendChild(newEl);
        // 在候选区渲染,并清除不需要的样式
        newEl.style = "visibility: hidden;";

        // 移动的动画
        const l =
            (candidates.length % config.candidateSize) * config.itemSize.width;
        const t =
            (config.mapSize.height +
                ~~(candidates.length / config.candidateSize)) *
            config.itemSize.height;
        /**
         *     transform: translate(calc(200% - 10px), 0);
         */
        item.el.style.left = `${l}rem`;
        item.el.style.top = `calc(${t}rem + ${2 + 10 + 10 + 10}px)`;
        item.el.classList.add("move");

        candidates.push(item);
        updateCoverState(item);
    }
}

/**
 * 将卡片移动到候选区
 */
export function cardToCandidate(id) {
    // 字符串和数字对比
    const index = cards.findIndex((e) => e.id == id);
    // 没找到,就退出
    if (index === -1) return;
    const item = cards[index];
    if (item.status !== 2) return;
    console.log("cardToCandidate");
    item.status = 3;
    //FIXME: 将这一步移动到上一步进行
    // 删除元素,取消和map的连接,
    destroyCard(item);
    item.candidateEl.style = "";
    // 在cards中清除item,在currentMap中清除item对应的坐标
    cards.splice(index, 1);
    let layer = currentMap[item.layer];
    const mapIndex = layer.findIndex((e) => e.cardItem === item);
    layer.splice(mapIndex, 1);

    checkCandidate();
}

/**
 * 检查是否有可以消除的卡片
 */
function checkCandidate() {
    console.log("checkCandidate");
    // 因为type是从0开始的数字,所以正好用数组
    const map = Array(images.length)
        .fill(0)
        .map(() => []);
    // 遍历的过程中可能会删除元素,所以直接遍历拷贝后的数组得了
    [...candidates].forEach((item, index) => {
        // 不是正在候选区的状态(正在移动到候选区),直接退出,不处理这个
        if (item.status !== 3) return;
        /** @type{Card[]}  */
        const curType = map[item.type];
        curType.push(item);
        // console.log(map, curType);
        // 检查3消
        if (curType.length >= 3) {
            // 消除逻辑
            curType.forEach((card) => {
                card?.candidateEl?.parentElement.removeChild(card.candidateEl);
                // 这样写,删除3个的时候,需要删除数组3次,可以优化为filter
                const index = candidates.findIndex((e) => e.id == card.id);
                candidates.splice(index, 1);
            });
            console.warn("消除完成", cards.length, candidates.length);
            console.log(cards[0]);
            // 消除后,检查是否游戏完成
            if (cards.length === 0 && candidates.length === 0) {
                alert("游戏胜利"+(randomCardCount?'!':''));
                gameStatus = 9;
            }
        }
    });
    /** 候选区满了 && 所有卡片的状态都是移动完成(可消除的) */
    if (checkCandidateFull() && candidates.every((e) => e.status === 3)) {
        alert("游戏结束");
        gameStatus = 2;
    }
}

/**
 * 检查候选区是否满
 * @returns
 */
function checkCandidateFull() {
    if (
        //有长度限制
        !config.candidateInfinite &&
        // 长度限制超出
        candidates.length >= config.candidateSize
    ) {
        return true;
    }
    return false;
}
