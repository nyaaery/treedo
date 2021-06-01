<script lang="ts">
    import { onMount } from "svelte";
    import { NodeManager } from "./NodeManager";
    import type { Node } from "./NodeManager";

    const manager: NodeManager = new NodeManager();
    let nodes: Node[] = [];

    onMount(() => {
        manager.nodes.subscribe(value => {
            nodes = value;
        });
        manager.get_nodes();
    });
</script>

<h1>Hello owo</h1>
{#each nodes as node}
    {node.content}<br>
{/each}