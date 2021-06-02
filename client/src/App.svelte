<script lang="ts">
    import Node from "./Node.svelte";
    import { BehaviorSubject } from "rxjs";
</script>

<Node node={{
    id: "test",
    pos: new BehaviorSubject([ 0, 0 ]),
    content: new BehaviorSubject("Todo"),
    children: new BehaviorSubject([]),
    size: [ 0, 0 ]
}} />