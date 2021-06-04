<script lang="ts">
    import type { Root } from "./tree";

    import NodeComponent from "./Node.svelte";

    export let root: Root;
    const { children } = root;
</script>

{#each $children as node}
    <NodeComponent node={node} />
{/each}