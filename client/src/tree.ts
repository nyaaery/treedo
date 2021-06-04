import type { BehaviorSubject } from "rxjs";

export type Vec2<T> = [ x: T, y: T ];

export interface Tree {
    root: Root
}

export interface Root {
    children: BehaviorSubject<Node[]>
}

export interface Node {
    id: string,
    pos: BehaviorSubject<Vec2<number> | null>,
    content: BehaviorSubject<string>,
    children: BehaviorSubject<Node[]>
}