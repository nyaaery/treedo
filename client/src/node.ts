import type { BehaviorSubject } from "rxjs";

export type Vec2<T> = [ x: T, y: T ];

export interface Node {
    id: string,
    pos: BehaviorSubject<Vec2<number>>,
    content: BehaviorSubject<string>,
    children: BehaviorSubject<Node[]>
    size: Vec2<number>
}