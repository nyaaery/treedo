<script lang="ts">
    import { onMount } from "svelte";
    import type { Node } from "./node";

    export let node: Node;
    export let editing: boolean = false;
    
    const { content, children } = node;
    let style: string;
    let el: HTMLDivElement;
    let input_el: HTMLInputElement;

    node.pos.subscribe(value => {
        style = `left: ${value[0]}px; top: ${value[1]}px;`;
    });

    onMount(() => {
        const rect = el.getBoundingClientRect();
        node.size = [ rect.width, rect.height ];
    });

    function on_keydown(event: KeyboardEvent) {
        if (event.key == "Enter") {
            const value: string = input_el.value;

            if (value.length > 0) {
                content.next(value);
                editing = false;
            }
        }
    }

    function on_blur() {
        editing = false;
    }

    function on_click() {
        editing = true;
        setTimeout(() => {
            input_el.focus();
        });
    }
</script>

<div data-id={node.id} style={style} bind:this={el}>
    {#if editing}
        <input type="text" value={$content} bind:this={input_el} on:keydown={on_keydown} on:blur={on_blur}>
    {:else}
        <span on:click={on_click}>{$content}</span>
    {/if}
</div>

<style>
    div {
        position: absolute;
        display: inline-block;
        min-width: 20vw;
        max-width: 50vw;
        padding: 1vmin;
        border: 1px solid black;
    }

    div * {
        font-size: 1em;
    }
</style>