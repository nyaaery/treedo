<script>
    let x = 0;

    function click() {
        x++;
    }
</script>

<h1>{x}</h1>
<button on:click={click}>Click me!</button>