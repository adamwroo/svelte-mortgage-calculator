<script>
    import { toPLN } from '../../utils';

    export let alternative;
    export let mortgage;

    $: newAmount = Math.max(mortgage.amount - alternative.overpayment, 0);
    $: newInterestRate = Math.max(mortgage.interestRate + alternative.interestRateChange, 0);

    console.log(mortgage.interestRate)
    console.log(alternative.interestRateChange)
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
<p>temp: {alternative.adjustType}</p>

<style>
    .better {
        color: green;
    }

    .worse {
        color: red;
    }
</style>