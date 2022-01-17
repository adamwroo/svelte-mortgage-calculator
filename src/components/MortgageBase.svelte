<script>
    import { toYearsAndMonthsHint } from '../utils';

    export let mortgageBase;

    let amountMax = mortgageBase.amount * 2;
    let interestRateMax = mortgageBase.interestRate * 2;
    let numberOfPaymentsMax = mortgageBase.numberOfPayments * 2;

    const updateMaxes = () => {
        amountMax = Math.max(mortgageBase.amount * 2, 100000);
        interestRateMax = Math.max(mortgageBase.interestRate * 2, 2);
        numberOfPaymentsMax = Math.max(mortgageBase.numberOfPayments * 2, 120);
    }
</script>

<h2>Kredyt:</h2>

<label for="amount">
    Kwota
    <br />
    <input bind:value={mortgageBase.amount} on:change={updateMaxes} type="number" id="amount" min="0" max="10000000" step="10000" />
    <br />
    <input bind:value={mortgageBase.amount} on:change={updateMaxes} type="range" min="10000" max={amountMax} step="10000" tabindex="-1" />
</label>

<label for="interestRate">
    Oprocentowanie
    <br />
    <input bind:value={mortgageBase.interestRate} on:change={updateMaxes} type="number" id="interestRate" min="0" max="100" step="0.1" />
    <br />
    <input bind:value={mortgageBase.interestRate} on:change={updateMaxes} type="range" min="0.1" max={interestRateMax} step="0.1" tabindex="-1" />
</label>

<label for="numberOfPayments">
    Liczba rat
    <br />
    <input bind:value={mortgageBase.numberOfPayments} on:change={updateMaxes} type="number" id="numberOfPayments" min="0" max="600" step="1" />
    <br />
    <input bind:value={mortgageBase.numberOfPayments} on:change={updateMaxes} type="range" min="1" max={numberOfPaymentsMax} step="1" tabindex="-1" />
    <br />
    ({ toYearsAndMonthsHint(mortgageBase.numberOfPayments) })
</label>