<script>
    import { toPLN } from '../utils';
    import PieChart from './shared/PieChart.svelte';

    export let mortgage;
</script>

<h2>Koszt</h2>

<div class="cost">
    <span>Miesięczna rata: <strong>{ toPLN(mortgage.monthlyInstallment) }</strong></span>
    <span>Koszt odsetek: <strong>{ toPLN(mortgage.getInterestCost()) }</strong></span>
    <PieChart {mortgage} />
</div>

<style>
    strong {
        font-size: 1.05em;
    }

    .cost {
        display: flex;
        flex-direction: column;
        min-width: 26ch; /* to make place for text with cost over 1M to avoid 'jumping' */
    }
</style>