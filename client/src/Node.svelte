<script lang="ts">
    import type { Node } from "./tree";

    export let node: Node;
    const { content, children } = node;

    let style: string;

    node.pos.subscribe(value => {
        if (value) {
            style = `left: ${value[0]}px; top: ${value[1]}px;`;
        } else {
            style = "";
        }
    });
</script>

<div class="bounds" style={style}>
    <div class="todo" data-id={node.id}>
        <span>{$content}</span>
    </div>
    {#each $children as node}
        <svelte:self node={node} />
    {/each}
</div>

<style>
    .bounds {
        position: absolute;
        display: inline-block;
        border: 1px solid red;
    }

    .todo {
        display: inline-block;
        background: #cfc;
    }
</style>