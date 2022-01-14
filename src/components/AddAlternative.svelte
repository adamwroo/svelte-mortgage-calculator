<script>
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    import { fade } from 'svelte/transition';
    import { clickOutside } from "../actions";
    export let mortgageBase;

    let showModal = false;

    let overpayment = 0;
    let overpaymentResult = "shorten-credit"; // or "reduce-installment";
    let newInterestRate = mortgageBase.interestRate;

    let isAlternativeDifferent = false;
    $: isAlternativeDifferent = overpayment > 0 || newInterestRate != mortgageBase.interestRate;

    const addAlternative = () =>{
        // todo: add proper submit
        showModal = false;
        dispatch('alternative-added', {overpayment, overpaymentResult, newInterestRate});
    }
</script>

<div>
    <br />
    <button on:click={() => (showModal = true)}>Porównaj</button>

    {#if showModal}
    <div class="bg">
        <div class="window-wrap" transition:fade>
            <div
                class="window"
                role="dialog"
                aria-modal="true"
                transition:fade
            >
                <div class="content"
                    use:clickOutside
                    on:outclick={() => (showModal = false)}
                >
                    <label for="amount">
                        Nadpłata
                        <br />
                        <input bind:value={overpayment} type="number" id="amount" min="0" max={mortgageBase.amount} step="10000" />
                    </label>

                    <div>
                        <label>
                            <input type="radio" bind:group={overpaymentResult} name="overpayment-result" value="shorten-credit" disabled={overpayment == 0}>
                            Skróć kredyt
                        </label>
                        <label>
                            <input type="radio" bind:group={overpaymentResult} name="overpayment-result" value="reduce-installment" disabled={overpayment == 0}>
                            Zmniejsz ratę
                        </label>
                    </div>

                    <label for="interestRate">
                        Nowe oprocentowanie
                        <br />
                        <input bind:value={newInterestRate} type="number" id="interestRate" min="0.1" max="100" step="0.1" />
                    </label>

                    <div class="buttons">
                        <!-- todo: should reset values -->
                        <button on:click={() => (showModal = false)}>Anuluj</button>
                        <button on:click={addAlternative} disabled={!isAlternativeDifferent}>Potwierdź</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>

<style>
    * {
        box-sizing: border-box;
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
        margin: 2rem;
        max-height: 100%;
    }

    .window {
        position: relative;
        /*width: 40rem;
        max-width: 100%;*/
        max-width: min(100%, 40rem);
        max-height: 100%;
        margin: 2rem auto;
        color: black;
        border-radius: 0.5rem;
        background: white;
    }

    .content {
        position: relative;
        padding: 0.5rem 1rem;
        max-height: calc(100vh - 4rem);
        overflow: auto;
        /* mine */
        display: flex;
        gap: 1rem;
        flex-direction: column;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>