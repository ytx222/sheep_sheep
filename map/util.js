export function mergeLayer(...items) {
    console.warn(items);
    const maxLayer = Math.max(...items.map((e) => e.length));
    return [
        //
        ...items[0],
        ...items[1],
        ...(items[2] || []),
        ...(items[3] || []),
    ];
}

/** 根据指定大小,填充一个满的矩形 */
export function rectangleLayer(top, bottom, left, right) {
    let arr = [];
    for (var y = top; y < bottom; y++) {
        for (var x = left; x < right; x++) {
            arr.push({ x, y });
        }
    }
    return arr;
}

/**
 * 横线
 * @param {*} start
 * @param {*} direction
 * @returns
 */
export function horizontalLine(y, start, direction, length) {
    let arr = [];
    for (var i = 0; i < length; i++) {
        arr[i] = [{ y, x: start + direction * i }];
    }
	console.warn(arr);
    return arr;
}

/** 小正方形 */
export function day2022_10_8_littleSquare(left, top, size = 2, height = 8) {
    const arr = [];
    for (var i = 0; i < height; i++) {
        switch (i % 4) {
            // 完整的
            case 0:
            case 2:
                arr.push(rectangleLayer(top, top + size, left, left + size));
                break;
            // 横线,每隔 固定距离覆盖一次
            case 1:
                for (var j = 0.2; j <= size - 1; j += 0.3) {
                    arr.push(
                        rectangleLayer(top + j, top + j + 1, left, left + size)
                    );
                }
                break;
            case 3:
                arr.push(
                    rectangleLayer(
                        top + 0.5,
                        top + size - 0.5,
                        left + 0.5,
                        left + size - 0.5
                    )
                );

                break;

            default:
                break;
        }
    }
    return arr;
}

/** 旋转的形状,中间加点填充 */
export function day2022_10_8_rotate(top, bottom, left, right) {
    const layerCount = Math.max(bottom - top, right - left) * 2 + 1;
    const arr = [];

    for (var i = 0; i < layerCount; i++) {
        const space = i * 0.5;
        const layer = [];
        // 每两层,覆盖一下
        if (i % 2 === 0) {
            const space = i % 4 === 2 ? 0 : 0.5;
            const l = space + left + 2;
            const r = right - 2 - space;
            const t = space + top + 2;
            const b = bottom - 2 - space;
            layer.push(...rectangleLayer(t, b, l, r));
        }

        if (left + space <= right - 1)
            layer.push(
                // 上 →
                { x: left + space, y: top },
                { x: left + space, y: top + 1 },

                // 下 ←
                { x: right - space - 1, y: bottom - 2 },
                { x: right - space - 1, y: bottom - 1 }
            );
        if (top + space <= bottom - 1)
            layer.push(
                // 右 ↓
                { x: right - 2, y: top + space },
                { x: right - 1, y: top + space },
                // 左 ↑
                { x: left, y: bottom - space - 1 },
                { x: left + 1, y: bottom - space - 1 }
            );
        arr[i] = layer;
    }
    return arr;
}
