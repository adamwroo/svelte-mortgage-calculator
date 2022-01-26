<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { toPLN } from '../../utils';
    import { selectOnFocus } from '../../actions';

    export let alternative;
    export let mortgage;
    export let isEditing = false;

    let isAlternativeDifferent = false;
    $: isAlternativeDifferent = alternative.overpayment > 0 || alternative.interestRateChange != 0; // todo" should be differen for 'isEditing'

    const cancel = () => {
        dispatch('cancel');
    }

    const discard = () => {
        dispatch('discard');
    }

    const submitAlternative = () => {
        if (isEditing)
            dispatch('save', alternative);
        else
            dispatch('add', alternative);
    }
</script>

<form on:submit|preventDefault={submitAlternative} on:keydown={e => e.key === 'Escape' && cancel()}>
    <label for="amount-form">
        Nadpłata
        <br />
        <input bind:value={alternative.overpayment} use:selectOnFocus type="number" id="amount-form" min="0" max={mortgage.amount} step="100" autocomplete="off" />
        <br />
        <small><i>Pozostała kwota: {toPLN(mortgage.amount - alternative.overpayment)}</i></small>
    </label>

    <label for="interest-rate-change-form">
        Zmiana oprocentowania (+/-)
        <br />
        <input bind:value={alternative.interestRateChange} use:selectOnFocus type="number" id="interest-rate-change-form" min={-mortgage.interestRate} max="100" step="0.01" autocomplete="off" />
        <br />
        <small><i>Nowe oprocentowanie: {(mortgage.interestRate + alternative.interestRateChange).toFixed(2)}%</i></small>
    </label>

    <div>
        <label>
            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-number-of-payments" />
            Zmień liczbę rat
        </label>
        <label>
            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-installment" />
            Zmień wysokość raty
        </label>
    </div>

    <div class="buttons">
        <button type="button" on:click={discard}>Anuluj</button>
        <button type="submit" disabled={!isAlternativeDifferent}>Potwierdź</button>
    </div>
</form>

<style>
    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>