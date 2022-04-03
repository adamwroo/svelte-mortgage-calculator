<script>
    export let mortgage;

    $: mortgageAmount = mortgage.amount;
    $: interestCost = mortgage.getInterestCost();
    $: amountProcent = mortgageAmount * 100 / (mortgageAmount + interestCost);
    $: costProcent = interestCost * 100 / (mortgageAmount + interestCost);
</script>

<div class="my-pie-chart-container" style="--amount-percent: {amountProcent}%; --cost-percent: {costProcent}%">
    <div class="my-pie-chart" />

    <div class="legenda">
        <div class="entry">
            <div class="entry-color entry-amount" />
            <div class="entry-text">Kapitał</div>
        </div>
        <div class="entry">
            <div  class="entry-color entry-cost" />
            <div class="entry-text">Odsetki</div>
        </div>
    </div>
</div>

<style>
    /* todo: get rid of px units; add aspect-ratio and grow: 1 to pie chart */
    .my-pie-chart-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .my-pie-chart {
        background: conic-gradient(
            var(--accent-color) 0% var(--amount-percent),
            var(--background-color-card) var(--amount-percent)
        );
        border-radius: 50%;
        width: 150px;
        height: 150px;

        border: 1px solid var(--background-color);
    }

    .legenda {
        margin-left: 20px;
        background-color: var(--background-color-card);
        padding: 5px;
    }

    .entry {
        display: flex;
        align-items: center;
    }

    .entry-color {
        height: 10px;
        width: 10px;
    }

    .entry-text {
        margin-left: 5px;
    }

    .entry-amount {
        background-color: var(--accent-color);
    }

    .entry-cost {
        background-color: var(--background-color-card);
        border: 1px solid var(--background-color);
    }
</style>
