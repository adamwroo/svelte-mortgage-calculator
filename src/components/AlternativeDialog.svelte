<script>
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    import { fade } from 'svelte/transition';
    import { clickOutside } from "../actions";
    import { toPLN } from '../utils';

    export let alternative;
    export let mortgage;

    let isAlternativeDifferent = false;
    $: isAlternativeDifferent = alternative.overpayment > 0 || alternative.interestRateChange != 0;

    const cancel = () => {
        dispatch('cancel');
    }

    const discard = () => {
        dispatch('discard');
    }

    const addAlternative = () => {
        dispatch('add', alternative);
    }
</script>

<div class="bg">
    <div class="window-wrap" transition:fade>
        <div
            class="window"
            role="dialog"
            aria-modal="true"
        >
            <div class="content"
                use:clickOutside
                on:outclick={cancel}
            >
                <form on:submit|preventDefault={addAlternative} on:keydown={e => e.key === 'Escape' && cancel()}>
                    <label for="amount">
                        Nadpłata
                        <br />
                        <input bind:value={alternative.overpayment} type="number" id="amount" min="0" max={mortgage.amount} step="10000" autocomplete="off" />
                        <br />
                        <small><i>Pozostała kwota: {toPLN(mortgage.amount - alternative.overpayment)}</i></small>
                    </label>

                    <label for="interestRateChange">
                        Zmiana oprocentowania (+/-)
                        <br />
                        <input bind:value={alternative.interestRateChange} type="number" id="interestRateChange" min={-mortgage.interestRate} max="100" step="0.01" autocomplete="off" />
                        <br />
                        <small><i>Nowe oprocentowanie: {mortgage.interestRate + alternative.interestRateChange}%</i></small>
                    </label>

                    <div>
                        <label>
                            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-number-of-payments" disabled={alternative.overpayment == 0}>
                            Zmień liczbę rat
                        </label>
                        <label>
                            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-installment" disabled={alternative.overpayment == 0}>
                            Zmień wysokość raty
                        </label>
                    </div>

                    <div class="buttons">
                        <button type="button" on:click={discard}>Anuluj</button>
                        <button type="submit" disabled={!isAlternativeDifferent}>Potwierdź</button>
                    </div>
                </form>
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
        background: rgba(0, 0, 0, 0.66);
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
        color: black;
        border-radius: 0.5rem;
        background: white;
    }

    .content {
        position: relative;
        padding: 0.5rem 1rem;
        max-height: calc(100vh - calc(2 * var(--main-margin)));
        overflow: auto;
        display: flex;
        /*gap: 1rem;*/ /* todo */
        flex-direction: column;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>