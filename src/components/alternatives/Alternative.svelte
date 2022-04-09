<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import AlternativeInfo from './AlternativeInfo.svelte';
    import { toYearsAndMonthsHint, toPLN } from '../../utils';
    import { recalculate } from '../../calculations';

    export let alternative;
    export let mortgage;
    export let send;
    export let receive;
    export let isEditing = false;

    $: newMortgage = recalculate(mortgage, alternative);

    const edit = () => {
        dispatch('edit', alternative);
    }

    const remove = () => {
        dispatch('remove', alternative.id);
    }
</script>

<p>
    <button class="primary" on:click={edit}>Edytuj</button>
    <button class="secondary" on:click={remove}>Usuń</button>
</p>
{#if newMortgage == null}
    <p class="warning">Niewłaściwe dane</p>
{:else}
    <p>
        Kwota: {toPLN(newMortgage.amount)}
        <AlternativeInfo oldValue={mortgage.amount} newValue={newMortgage.amount} type="currency" />
    </p>
    <p>
        Oprocentowanie: {newMortgage.interestRate.toFixed(2)}%
        <AlternativeInfo oldValue={mortgage.interestRate} newValue={newMortgage.interestRate} type="percent" />
    </p>
    <p>
        Liczba rat: {newMortgage.numberOfPayments} ({toYearsAndMonthsHint(newMortgage.numberOfPayments)})
        <br />
        <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={newMortgage.numberOfPayments} />
        <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={newMortgage.numberOfPayments} type="years-and-months" />
    </p>
    <p>
        Miesięczna rata: { toPLN(newMortgage.monthlyInstallment) }
        {#if alternative.adjustType === 'adjust-installment' || mortgage.interestRate != newMortgage.interestRate}
            <AlternativeInfo oldValue={mortgage.monthlyInstallment} newValue={newMortgage.monthlyInstallment} type="currency" />
        {/if}
    </p>
    <p>
        Koszt odsetek: { toPLN(newMortgage.getInterestCost()) }
        <AlternativeInfo oldValue={mortgage.getInterestCost()} newValue={newMortgage.getInterestCost()} type="currency" />
    </p>
{/if}


{#if !isEditing}
    <div class="bg" in:receive={{key: alternative.id}} out:send|local={{key: alternative.id}}></div>
{/if}

<style>
    p {
        margin: 0;
    }

    .warning {
        color: red;
    }

    .bg {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        pointer-events: none;
        z-index: -1;
    }
</style>