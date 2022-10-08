/** 确保你的项目中有tsconfig */
import { _config } from "./config";
import { Card } from "./game";
declare global {
    declare enum CardStatus {
        /** * 未插入到文档 未初始化 */
        initial = 0,
        /** 已插入到文档 */
        append = 1,
        /** 正在前往候选区的动画 这是一个临时状态 */
        candidate = 2,
        /** 正在候选区  */
        candidate = 3,
        /** 已经消除 */
        remove = 9,
    }

    declare type MapItem = {
        x: number;
        y: number;
        cardItem?: Card;
    };

    declare type MapLayer = MapItem[];

    type Size = {
        width: number;
        height: number;
    };

    declare type config = typeof _config & {
        map: MapLayer[];
    };
}
