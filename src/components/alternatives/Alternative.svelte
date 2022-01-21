<script>
    import { toPLN } from '../../utils';
    import { recalculate } from '../../calculations';

    export let alternative;
    export let mortgage;

    $: newAmount = Math.max(mortgage.amount - alternative.overpayment, 0);
    $: newInterestRate = Math.max(mortgage.interestRate + alternative.interestRateChange, 0);

    $: newMortgage = recalculate(mortgage, alternative);
</script>

<hr />
<p>Alternatywa {alternative.id}</p>
<p>
    Kwota: {toPLN(newAmount)}
    {#if alternative.overpayment > 0}
        (<b class="better">-{toPLN(alternative.overpayment)}</b>)
    {/if}
</p>
<p>
    Oprocentowanie: {newInterestRate}%
    {#if alternative.interestRateChange < 0}
        (<b class="better">{alternative.interestRateChange}%</b>)
    {:else if alternative.interestRateChange > 0}
        (<b class="worse">+{alternative.interestRateChange}%</b>)
    {/if}
</p>
{#if newMortgage != null && !isNaN(newMortgage.numberOfPayments)}
    <p>
        Liczba rat: {newMortgage.numberOfPayments}
        {#if alternative.adjustType === 'adjust-number-of-payments' && newMortgage.numberOfPayments < mortgage.numberOfPayments}
            (<b class="better">{newMortgage.numberOfPayments - mortgage.numberOfPayments}</b>)
        {:else if alternative.adjustType === 'adjust-number-of-payments' && newMortgage.numberOfPayments < mortgage.numberOfPayments}
            (<b class="worce">+{newMortgage.numberOfPayments - mortgage.numberOfPayments}</b>)
        {/if}
    </p>
    <p>
        Miesięczna rata: { toPLN(newMortgage.monthlyInstallment) }
        {#if alternative.adjustType === 'adjust-installment' && newMortgage.monthlyInstallment < mortgage.monthlyInstallment}
            (<b class="better">{toPLN(newMortgage.monthlyInstallment - mortgage.monthlyInstallment)}</b>)
        {:else if alternative.adjustType === 'adjust-installment' && newMortgage.monthlyInstallment > mortgage.monthlyInstallment}
            (<b class="worse">+{toPLN(newMortgage.monthlyInstallment - mortgage.monthlyInstallment)}</b>)
        {/if}
    </p>
    <p>
        Całkowity koszt odsetek: { toPLN(newMortgage.getInterestCost()) }
        {#if newMortgage.getInterestCost() < mortgage.getInterestCost()}
            (<b class="better">{toPLN(newMortgage.getInterestCost() - mortgage.getInterestCost())}</b>)
        {:else if newMortgage.monthlyInstallment > mortgage.monthlyInstallment}
            (<b class="worse">+{toPLN(newMortgage.getInterestCost() - mortgage.getInterestCost())}</b>)
        {/if}
    </p>
{:else if newMortgage != null && alternative.adjustType === 'adjust-number-of-payments' && isNaN(newMortgage.numberOfPayments)}
    <p class="worse">
        Przy oprocentowaniu {newInterestRate}% niemożliwe jest utrzymanie wysokości raty {toPLN(mortgage.monthlyInstallment)}.
        <br />
        Miesięczny koszt samej raty odsetkowej przekracza {toPLN(mortgage.monthlyInstallment)}!
    </p>
{/if}

<style>
    p {
        margin: 0;
    }

    .better {
        color: green;
    }

    .worse {
        color: red;
    }
</style>