<script lang="ts">
    import { onMount } from "svelte";
    import type { Node } from "./node";

    export let node: Node;
    export let editing: boolean = false;
    
    const { content, children } = node;
    let el: HTMLDivElement;
    let input_el: HTMLInputElement;

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

<div bind:this={el}>
    {#if editing}
        <input type="text" value={$content} bind:this={input_el} on:keydown={on_keydown} on:blur={on_blur}>
    {:else}
        <span on:click={on_click}>{$content}</span>
    {/if}
</div>

<style>
    div {
        display: inline-block;
        min-width: 20vw;
        max-width: 50vw;
        padding: 10px;
        border: 1px solid black;
    }
</style>