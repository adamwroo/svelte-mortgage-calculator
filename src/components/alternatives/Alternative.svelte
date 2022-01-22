<script>
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    import { fade } from 'svelte/transition';
    import AlternativeInfo from './AlternativeInfo.svelte';
    import { toYearsAndMonthsHint, toPLN } from '../../utils';
    import { recalculate } from '../../calculations';

    export let alternative;
    export let mortgage;

    $: newMortgage = recalculate(mortgage, alternative);

    const remove = () => {
        dispatch('remove', alternative.id);
    }
</script>

<div transition:fade>
    <hr />
    <p>
        Alternatywa
        <button on:click={remove}>Usuń</button>
    </p>
    <p>
        Kwota: {toPLN(newMortgage.amount)}
        <AlternativeInfo oldValue={mortgage.amount} newValue={newMortgage.amount} type="currency" />
    </p>
    <p>
        Oprocentowanie: {newMortgage.interestRate.toFixed(2)}%
        <AlternativeInfo oldValue={mortgage.interestRate} newValue={newMortgage.interestRate} type="percent" />
    </p>
    {#if newMortgage != null && !isNaN(newMortgage.numberOfPayments)}
        <p>
            Liczba rat: {newMortgage.numberOfPayments} ({toYearsAndMonthsHint(newMortgage.numberOfPayments)})
            <br />
            <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={newMortgage.numberOfPayments} />
            <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={newMortgage.numberOfPayments} type="years-and-mmonths" />
        </p>
        <p>
            Miesięczna rata: { toPLN(newMortgage.monthlyInstallment) }
            {#if alternative.adjustType === 'adjust-installment'}
                <AlternativeInfo oldValue={mortgage.monthlyInstallment} newValue={newMortgage.monthlyInstallment} type="currency" />
            {/if}
        </p>
        <p>
            Całkowity koszt odsetek: { toPLN(newMortgage.getInterestCost()) }
            <AlternativeInfo oldValue={mortgage.getInterestCost()} newValue={newMortgage.getInterestCost()} type="currency" />
        </p>
    {:else if newMortgage != null && alternative.adjustType === 'adjust-number-of-payments' && isNaN(newMortgage.numberOfPayments)}
        <p class="warning">
            <small>
                Przy oprocentowaniu {newMortgage.interestRate}% niemożliwe jest utrzymanie wysokości raty {toPLN(mortgage.monthlyInstallment)}.
                <br />
                Liczba rat musiałaby być &infin;!
            </small>
        </p>
    {/if}
</div>

<style>
    p {
        margin: 0;
    }

    .warning {
        color: red;
    }
</style>