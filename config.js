export const _config = {
    /** 候选区大小  */
    candidateSize: 7,
    /* 候选区无穷大 */
    candidateInfinite: true,
    /**
     * 卡片大小 vw/vmin
     * 12/14vw
     */
    itemSize: {
        width: 3,
        height: 3.6,
    },
    /**
     * 棋盘大小,值是卡片大小的倍数
     */
    mapSize: {
        width: 7,
        height: 9,
    },
};

function rows(t, b, s, e) {
    let arr = [];
    for (var y = t; y < b; y++) {
        for (var x = s; x < e; x++) {
            arr.push({ x, y });
        }
    }
    return arr;
}

/**
 * @type {MapLayer}
 */
export const map = [

    // rows(0.5, 2.5, 0.5, 2.5),
    // rows(1, 2, 1, 3),

    // rows(0.5, 6.5, 0.5, 6.5),
    // rows(1, 6, 1, 6),
    // rows(0.5, 6.5, 0.5, 6.5),
    // rows(1, 6, 1, 6),
    // rows(0.5, 6.5, 0.5, 6.5),
    // rows(1, 6, 1, 6),
    // rows(0.5, 6.5, 0.5, 6.5),
    // rows(1, 6, 1, 6),
    // rows(0.5, 6.5, 0.5, 6.5),
    // rows(1, 6, 1, 6),
    // rows(0.5, 6.5, 0.5, 6.5),
    // rows(1, 6, 1, 6),
    // /*
    // 第一层
    [
        // 每一个元素
        { x: 1, y: 1.5 },
        { x: 3, y: 1.5 },
        { x: 5, y: 1.5 },

        { x: 1, y: 3.5 },
        { x: 3, y: 3.5 },
        { x: 5, y: 3.5 },

        { x: 1, y: 5.4 },
        { x: 3, y: 5.4 },
        { x: 5, y: 5.4 },
    ],
    // 第二层
    [
        // 每一个元素
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 5, y: 2 },

        { x: 1, y: 4 },
        { x: 3, y: 4 },
        { x: 5, y: 4 },

        { x: 1, y: 5.5 },
        { x: 3, y: 5.5 },
        { x: 5, y: 5.5 },
    ],
    // */
];

/**
 * @type {config}
 */
export const config = {
    map,
    ..._config,
};

/**

./img/

 */
export const images = [
    "16gl-1.png",
    "16gl-2.png",
    "16gl-3.png",
    "16gl-4.png",
    "16gl-5.png",
    "16gl-6.png",
    "16gl-7.png",
    // "16gl-8.png",
    // "16gl-9.png",
];
