<script>
    import { fade } from 'svelte/transition';
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    import { clickOutside } from "../actions";

    export let send;
    export let receive;
    export let key;

    const onOutclick = () => dispatch('cancel');
</script>

<div class="bg" transition:fade>
    <div class="window-wrap" >
        <div
            class="window"
            role="dialog"
            aria-modal="true"
            in:receive={{key}}
            out:send={{key}}
        >
            <div class="content"
                use:clickOutside
                on:outclick={onOutclick}
            >
                <slot></slot>
            </div>
        </div>
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
        --main-margin: 2rem;
    }

    .bg {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: var(--background-color-dialog);
    }

    .window-wrap {
        position: relative;
        margin: var(--main-margin);
        max-height: 100%;
    }

    .window {
        position: relative;
        max-width: min(100%, 40rem);
        max-height: 100%;
        margin: var(--main-margin) auto;
        border-radius: 0.5rem;
        color: var(--color);
        background-color: var(--background-color);
        box-shadow:
            0px 12px 17px 2px hsla(0,0%,0%,0.14), 
            0px 5px 22px 4px hsla(0,0%,0%,0.12), 
            0px 7px 8px -4px hsla(0,0%,0%,0.2);
        }

    .content {
        position: relative;
        padding: 0.5rem 1rem;
        max-height: calc(100vh - calc(2 * var(--main-margin)));
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
</style>