/**
 * 统计用的
 */
import { images } from "./config.js";
import { Card } from "./game.js";

/**
 * 游戏初始化时
 * @type {Card[]}
 */
export let initCards = [];

export function cardInfoToTable() {
    const types = [];
    for (var i = 0; i < initCards.length; i++) {
        const card = initCards[i];
        // 初始化类型值
        if (!types[card.type]) {
            types[card.type] = {
                type: card.type,
                // 高级处理
                img: images[card.type],
                count: 0,
                remove: 0,
            };
        }

        types[card.type].count++;
        if (card.status === 9) {
            types[card.type].remove++;
        }
    }
    let count = 0;
    let remove = 0;
    types.forEach((e) => {
        count += e.count;
        remove += e.remove;
    });
    if (count === 0) return "请先开始游戏";
    return `
<table>
	<thead>
		<tr>
			<th>类型</th>
			<th>总数</th>
			<th>已消除数</th>
			<th>类型</th>
			<th>总数</th>
			<th>已消除数</th>
		</tr>
	</thead>
	<tbody>
		${types
            .map((e, index) => {
                return `${index % 2 == 0 ? "<tr>" : ""}
						<td><img src="${e.img}" alt=""></td>
						<td>${e.count}</td>
						<td>${e.remove}</td>
					${index % 2 === 1 || index === types.length - 1 ? "</tr>" : ""}`;
            })
            .join("\n")}
		<tr>
			<td>合计</td>
			<td>${count}</td>
			<td>${remove}</td>
		</tr>
	</tbody>
</table>`;
}


/**
 * 调用随机的次数
 */
export let randomCardCount = 0;
/**
 * 更新 调用随机的次数
 * @param {*} v
 */
export const updateRandomCardCount = (v) => void (randomCardCount = v);
