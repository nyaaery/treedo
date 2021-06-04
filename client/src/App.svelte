<script lang="ts">
    import type { Tree, Root, Node } from "./tree";

    import { BehaviorSubject } from "rxjs";
    import TreeComponent from "./Tree.svelte";

    function rint(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function rand_node(id: string, depth: number): Node {
        const children: Node[] = [];
        const has_children: boolean = depth < 3 && Math.random() >= 0.5;

        if (has_children) {
            for (let i = 1; i <= rint(1, 3); i++) {
                children.push(rand_node(id + ":" + i.toString(), depth + 1));
            }
        }

        return {
            id,
            pos: new BehaviorSubject(has_children ? [ rint(0, 500), rint(0, 500) ] : null),
            children: new BehaviorSubject(children),
            content: new BehaviorSubject("Node #" + id)
        }
    }

    const children: Node[] = [];

    for (let i = 1; i <= 5; i++) {
        children.push(rand_node(i.toString(), 0));
    }

    const root: Root = {
        children: new BehaviorSubject(children)
    };
    const tree: Tree = {
        root
    };
</script>

<TreeComponent tree={tree} />