<script lang="ts">
    import { BehaviorSubject } from "rxjs";
    import type { Node } from "./node";

    const nodes: BehaviorSubject<Map<string, Node>> = new BehaviorSubject(new Map());
</script>