<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { toPLN } from '../../utils';
    import { selectOnFocus } from '../../actions';

    export let alternative;
    export let mortgage;

    let initialAlternative = {...alternative};

    let isAlternativeDifferent = false;
    $: isAlternativeDifferent = alternative.overpayment !== initialAlternative.overpayment
        || alternative.interestRateChange !== initialAlternative.interestRateChange
        || alternative.adjustType !== initialAlternative.adjustType;

    const onCancel = () => {
        dispatch('cancel');
    }

    const onSubmit = () => {
        // todo: test why 'Enter' submits
        dispatch('save', alternative);
    }
</script>

<form on:submit|preventDefault={onSubmit} on:keydown={e => e.key === 'Escape' && onCancel()}>
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
            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-installment" />
            Zmień wysokość raty
        </label>
        <label>
            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-number-of-payments" />
            Zmień liczbę rat
        </label>
    </div>

    <div class="buttons">
        <button type="button" on:click={onCancel}>Anuluj</button>
        <button type="submit" disabled={!isAlternativeDifferent}>Potwierdź</button>
    </div>
</form>

<style>
    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>