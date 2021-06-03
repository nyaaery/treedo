<script lang="ts">
    import type { Node } from "./node";
    import NodeComponent from "./Node.svelte";
    import { BehaviorSubject } from "rxjs";

    const nodes: Node[] = [];

    function rand(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 1; i <= 10; i++) {
        nodes.push({
            id: i.toString(),
            pos: new BehaviorSubject([ rand(0, 1000), rand(0, 1000) ]),
            content: new BehaviorSubject("Note #" + i),
            children: new BehaviorSubject([]),
            size: null
        });
    }
</script>

{#each nodes as node}
    <NodeComponent node={node} />
{/each}