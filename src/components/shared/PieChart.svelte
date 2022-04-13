<script>
    export let mortgage;

    let containerElWidth;

    $: mortgageAmount = mortgage.amount;
    $: interestCost = mortgage.getInterestCost();
    $: amountProcent = mortgageAmount * 100 / (mortgageAmount + interestCost);
</script>

<div bind:clientWidth={containerElWidth} class="my-pie-chart-container" style="--amount-percent: {amountProcent}%; --container-width: {containerElWidth}px">
    <div class="my-pie-chart" />
    <div class="legend">
        <div class="entry">
            <div class="entry-color entry-amount" />
            <div>Kapitał</div>
        </div>
        <div class="entry">
            <div class="entry-color entry-cost" />
            <div>Odsetki</div>
        </div>
    </div>
</div>

<style>
    .my-pie-chart-container {
        display: flex;
        gap: min(1em, calc(var(--container-width) / 20));
    }

    .my-pie-chart {
        flex-grow: 1;
        aspect-ratio: 1;
        background: conic-gradient(
            var(--accent-color) 0% var(--amount-percent),
            var(--background-color-card) var(--amount-percent)
        );
        border-radius: 50%;
    }

    .legend {
        background-color: var(--background-color-card);
        padding: 0.375em;
        align-self: center;
        font-size: min(1em, calc(var(--container-width) / 20));
    }

    .entry {
        display: flex;
        align-items: center;
        gap: 0.5em
    }

    .entry-color {
        height: 1em;
        width: 1em;
    }

    .entry-amount {
        background-color: var(--accent-color);
    }

    .entry-cost {
        background-color: var(--background-color-card);
        border: 1px solid var(--background-color);
    }
</style>
