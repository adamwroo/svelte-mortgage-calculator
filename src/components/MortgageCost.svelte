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
    span:last-of-type {
        margin-bottom: 0.5em;
    }

    strong {
        font-size: 1.05em;
    }

    .cost {
        display: flex;
        flex-direction: column;
    }
</style>