<script lang="ts">
    import type { Tree } from "./tree";
    
    import RootComponent from "./Root.svelte";

    export let tree: Tree;
</script>

<RootComponent root={tree.root} />