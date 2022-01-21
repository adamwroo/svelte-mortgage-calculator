<script>
    import { toYearsAndMonthsHint } from '../utils';

    export let mortgageBase;

    let amountMax, interestRateMax, numberOfPaymentsMax;

    const updateValuesAndMaxes = () => {
        mortgageBase.amount = Math.max(mortgageBase.amount, 0);
        mortgageBase.interestRate = Math.max(mortgageBase.interestRate, 0);
        mortgageBase.numberOfPayments = Math.max(mortgageBase.numberOfPayments, 0);

        amountMax = Math.max(mortgageBase.amount * 2, 100000);
        interestRateMax = Math.max(mortgageBase.interestRate * 2, 2);
        numberOfPaymentsMax = Math.max(mortgageBase.numberOfPayments * 2, 120);
    }

    updateValuesAndMaxes();
</script>

<h2>Kredyt:</h2>

<label for="amount">
    Kwota
    <br />
    <input bind:value={mortgageBase.amount} on:change={updateValuesAndMaxes} type="number" id="amount" min="0" max="10000000" step="100" autocomplete="off" />
    <br />
    <input bind:value={mortgageBase.amount} on:change={updateValuesAndMaxes} type="range" min="10000" max={amountMax} step="10000" tabindex="-1" />
</label>

<label for="interestRate">
    Oprocentowanie
    <br />
    <input bind:value={mortgageBase.interestRate} on:change={updateValuesAndMaxes} type="number" id="interestRate" min="0" max="100" step="0.01" autocomplete="off" />
    <br />
    <input bind:value={mortgageBase.interestRate} on:change={updateValuesAndMaxes} type="range" min="0" max={interestRateMax} step="0.01" tabindex="-1" />
</label>

<label for="numberOfPayments">
    Liczba rat
    <br />
    <input bind:value={mortgageBase.numberOfPayments} on:change={updateValuesAndMaxes} type="number" id="numberOfPayments" min="0" max="600" step="1" autocomplete="off" />
    <br />
    <input bind:value={mortgageBase.numberOfPayments} on:change={updateValuesAndMaxes} type="range" min="1" max={numberOfPaymentsMax} step="1" tabindex="-1" />
    <br />
    ({ toYearsAndMonthsHint(mortgageBase.numberOfPayments) })
</label>