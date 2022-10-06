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

function rectangleLayer(top, bottom, left, right) {
    let arr = [];
    for (var y = top; y < bottom; y++) {
        for (var x = left; x < right; x++) {
            arr.push({ x, y });
        }
    }
    return arr;
}

/**
 * @type {MapLayer}
 */
export const map = [
    rectangleLayer(0.5, 8.5, 0.5, 6.5),
    rectangleLayer(0.5, 8.5, 0.5, 6.5),
    rectangleLayer(1, 8, 1, 6),
    rectangleLayer(1, 8, 1, 6),
    rectangleLayer(0.5, 8.5, 0.5, 6.5),
    rectangleLayer(1, 8, 1, 6),
    rectangleLayer(0.5, 8.5, 0.5, 6.5),
    rectangleLayer(1, 8, 1, 6),
    rectangleLayer(0.5, 8.5, 0.5, 6.5),
    rectangleLayer(1, 8, 1, 6),
    rectangleLayer(0.5, 8.5, 0.5, 6.5),
    rectangleLayer(1, 8, 1, 6),

    /*
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
 * 使用的素材图片的数量
 */
const imageSize = 6;

const _images = [
    "fruits/包子.png",
    "fruits/南瓜.png",
    "fruits/杨桃.png",
    "fruits/火龙果.png",
    "fruits/石榴.png",
    "fruits/竹笋.png",
    "fruits/茄子.png",
    "fruits/蒜头.png",
    "fruits/西瓜.png",
    "fruits/豌豆.png",
    "fruits/车厘子.png",
    "fruits/面包.png",
    "fruits/鲜鱼.png",
    "fruits/龙虾.png",
];

/** 每次都随机使用不同的图片 */
export function updateImages() {
    let newImages = [];
    let imgs = _images.slice(0);
    for (var i = 0; i < imageSize; i++) {
        let index = ~~(Math.random() * imgs.length);
        newImages.push(...imgs.splice(index, 1));
    }
    images = newImages;
}
/**

 */
export let images = [
    ..._images.slice(0, imageSize),
    // "16gl-1.png",
    // "16gl-2.png",
    // "16gl-3.png",
    // "16gl-4.png",
    // "16gl-5.png",
    // "16gl-6.png",
    // "16gl-7.png",
    // "16gl-8.png",
    // "16gl-9.png",
];
