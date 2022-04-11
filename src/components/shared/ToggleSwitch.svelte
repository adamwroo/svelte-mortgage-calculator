<script>
    // todo: consider radio
    import { onMount } from 'svelte';

    export let checked;
    export let textFalse;
    export let textTrue;

    let gap;
    let divEl, divElWidth, switchElWidth, spanTextFalseElWidth, spanTextTrueElWidth;

    onMount(() => {
        gap = parseInt(getComputedStyle(divEl).gap);
    });
</script>

<div bind:this={divEl} bind:clientWidth={divElWidth} class:col={divElWidth < switchElWidth + spanTextFalseElWidth + spanTextTrueElWidth + 2 * gap}>
    <span bind:clientWidth={spanTextFalseElWidth} class:selected={!checked} aria-selected={!checked} on:click={() => {checked = false}}>{textFalse}</span>
    <label bind:clientWidth={switchElWidth} class="switch">
        <input type="checkbox" bind:checked={checked} />
        <span class="slider round" />
    </label>
    <span bind:clientWidth={spanTextTrueElWidth} class:selected={checked} aria-selected={checked} on:click={() => {checked = true}}>{textTrue}</span>
</div>

<style>
    * {
        --switch-width: 2.5em;
        --switch-height: 1.25em;
        --switch-padding: 0.15em;
        --switch-color: var(--accent-color);;
        --transition-duration: 0.4s;
    }

    div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 0.25em;
        justify-content: center;
        align-items: center;
    }

    div.col {
        flex-direction: column;
        gap: 0;
    }

    span {
        cursor: pointer;
    }

    /* Toggle Switch, see: https://www.w3schools.com/howto/howto_css_switch.asp */
    .switch {
        position: relative;
        display: inline-block;
        width: var(--switch-width);
        height: var(--switch-height);
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: var(--transition-duration);
    }

    .slider:before {
        position: absolute;
        content: "";
        height: calc(var(--switch-height) - 2 * var(--switch-padding));
        width: calc(var(--switch-height) - 2 * var(--switch-padding));
        left: var(--switch-padding);
        bottom: var(--switch-padding);
        background-color: white;
        transition: var(--transition-duration);
    }

    input + .slider {
        background-color: var(--switch-color);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--switch-color);
    }

    input:checked + .slider:before {
        transform: translateX(calc(var(--switch-width) - var(--switch-height)));
    }

    .slider.round {
        border-radius: var(--switch-height);
    }

    .slider.round:before {
        border-radius: 50%;
    }

    span.selected {
        color: var(--text-color);
        transition: color var(--transition-duration);
    }

    span:not(.selected ){
        color: var(--not-selected-text-color);
        transition: color var(--transition-duration);
    }
</style>