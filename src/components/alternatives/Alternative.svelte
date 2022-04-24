<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import AlternativeInfo from './AlternativeInfo.svelte';
    import InfoGrid from '../shared/InfoGrid.svelte';
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
    <InfoGrid>
        <span>Kwota:</span>
        <span>
            {toPLN(newMortgage.amount)}
            <AlternativeInfo oldValue={mortgage.amount} newValue={newMortgage.amount} type="currency" />
        </span>

        <span>Oprocentowanie:</span>
        <span>
            {newMortgage.interestRate.toFixed(2)}%
            <AlternativeInfo oldValue={mortgage.interestRate} newValue={newMortgage.interestRate} type="percent" />
        </span>

        <span>Liczba rat:</span>
        <span>
            {newMortgage.numberOfPayments} ({toYearsAndMonthsHint(newMortgage.numberOfPayments)})
        </span>
        <span></span>
        <span>
            <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={newMortgage.numberOfPayments} />
            <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={newMortgage.numberOfPayments} type="years-and-months" />
        </span>

        <span>Miesięczna rata:</span>
        <span>
            { toPLN(newMortgage.monthlyInstallment) }
            {#if alternative.adjustType === 'adjust-installment' || mortgage.interestRate != newMortgage.interestRate}
                <AlternativeInfo oldValue={mortgage.monthlyInstallment} newValue={newMortgage.monthlyInstallment} type="currency" />
            {/if}
        </span>

        <span>Koszt odsetek:</span>
        <span>
            { toPLN(newMortgage.getInterestCost()) }
            <AlternativeInfo oldValue={mortgage.getInterestCost()} newValue={newMortgage.getInterestCost()} type="currency" />
        </span>
    </InfoGrid>
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