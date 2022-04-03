<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { selectOnFocus, focusOnInit } from '../../actions';
    import Dialog from '../Dialog.svelte';

    export let mortgageAmount;

    let overpaymentAmount = 0;
    let overpaymentFrequency = 12;
    let overpaymentType = 'overwrite' // 'overwrite' or 'add'
    let isOverpaymentValid = false;
    $: isOverpaymentValid = overpaymentAmount > 0 && overpaymentFrequency > 0;

    const onCancel = () => {
        dispatch('cancel');
    }

    const onSubmit = () => {
        dispatch('save', {overpaymentAmount, overpaymentFrequency, overwrite: overpaymentType == 'overwrite'});
    }
</script>

<Dialog on:cancel >
    <form on:submit|preventDefault={onSubmit} on:keydown={e => e.key === 'Escape' && onCancel()}>
        <label for="overpayment-amount-form">
            Nadpłata
            <input bind:value={overpaymentAmount} use:selectOnFocus use:focusOnInit type="number" id="overpayment-amount-form" min="0" max={mortgageAmount} step="100" autocomplete="off" />
        </label>
        <label for="overpayment-frequency-form">
            Co
            <input bind:value={overpaymentFrequency} use:selectOnFocus type="number" id="overpayment-frequency-form" min="1" max="24" step="1" autocomplete="off" />
            miesięcy
        </label>
        <div>
            <label>
                <input type="radio" bind:group={overpaymentType} name="adjust-type" value="overwrite" />
                Nadpisz istniejące nadpłaty
            </label>
            <label>
                <input type="radio" bind:group={overpaymentType} name="adjust-type" value="add" />
                Dodaj do istniejących nadpłat
            </label>
        </div>
    
        <div class="buttons">
            <button type="button" class="secondary" on:click={onCancel}>Anuluj</button>
            <button type="submit" class="primary" disabled={!isOverpaymentValid}>Potwierdź</button>
        </div>
    </form>
</Dialog>

<style>
    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>