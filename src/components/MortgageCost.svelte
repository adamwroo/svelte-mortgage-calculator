<script>
    import { toPLN } from '../utils';
    import PieChart from './shared/PieChart.svelte';

    export let mortgage;
</script>

<h2>Koszt</h2>

<div class="cost">
    <span>Miesięczna rata: <strong>{ toPLN(mortgage.monthlyInstallment) }</strong></span>
    <span>Koszt odsetek: <strong>{ toPLN(mortgage.getInterestCost()) }</strong></span>
    <div class="mortgage-pie-chart">
        <PieChart {mortgage} />
    </div>
</div>

<style>
    strong {
        font-size: 1.05em;
    }

    .cost {
        display: flex;
        flex-direction: column;
    }

    .mortgage-pie-chart {
        display: flex;
        justify-content: center;
        height: clamp(40vw, 25vh, 10em);
        font-size: clamp(0.65em, 2.5vw, 0.9em); 
    }
</style>