<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import { toPLN } from '../../utils';
    import { selectOnFocus, focusOnInit } from '../../actions';

    export let alternative;
    export let mortgage;

    let initialAlternative = {...alternative};
    let adjustNumberOfPaymentsDisabled = true; // adjusting number of payments is only possible when overpayment is > 0

    let isAlternativeDifferent = false;
    $: isAlternativeDifferent = (alternative.overpayment > 0 && alternative.overpayment !== initialAlternative.overpayment)
        || alternative.interestRateChange !== initialAlternative.interestRateChange
        || (alternative.adjustType !== initialAlternative.adjustType && alternative.overpayment > 0);

    $: {
        if (alternative.overpayment > 0) {
            adjustNumberOfPaymentsDisabled = false;
        }

        if (alternative.overpayment === 0) {
            adjustNumberOfPaymentsDisabled = true;
            alternative.adjustType = 'adjust-installment';
        }
    }

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
        <input bind:value={alternative.overpayment} use:selectOnFocus use:focusOnInit type="number" id="amount-form" min="0" max={mortgage.amount} step="100" autocomplete="off" />
        <br />
        <small><i>Pozostała kwota: {toPLN(mortgage.amount - alternative.overpayment)}</i></small>
    </label>

    <div>
        <label>
            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-installment" />
            Zmniejsz wysokość raty
        </label>
        <label>
            <input type="radio" bind:group={alternative.adjustType} name="adjust-type" value="adjust-number-of-payments" disabled={adjustNumberOfPaymentsDisabled} />
            Zmniejsz liczbę rat
        </label>
    </div>

    <label for="interest-rate-change-form">
        Zmiana oprocentowania (+/- pp.)
        <br />
        <input bind:value={alternative.interestRateChange} use:selectOnFocus type="number" id="interest-rate-change-form" min={-mortgage.interestRate} max="100" step="0.01" autocomplete="off" />
        <br />
        <small><i>Nowe oprocentowanie: {(mortgage.interestRate + alternative.interestRateChange).toFixed(2)}%</i></small>
    </label>

    <div class="buttons">
        <button type="button" class="secondary" on:click={onCancel}>Anuluj</button>
        <button type="submit" class="primary" disabled={!isAlternativeDifferent}>Potwierdź</button>
    </div>
</form>

<style>
    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>