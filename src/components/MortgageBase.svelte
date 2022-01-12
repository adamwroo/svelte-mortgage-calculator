<script>
    import { toYearsAndMonthsHint } from '../utils';
    export let mortgageBase;
</script>

<h2>Kredyt:</h2>

<label for="amount">
    Kwota
    <br />
    <input bind:value={mortgageBase.amount} type="number" id="amount" min="10000" max="10000000" step="10000" />
    <br />
    <input bind:value={mortgageBase.amount} type="range" min="10000" max="10000000" step="10000" tabindex="-1" />
</label>

<label for="interestRate">
    Oprocentowanie
    <br />
    <input bind:value={mortgageBase.interestRate} type="number" id="interestRate" min="0.1" max="100" step="0.1" />
    <br />
    <input bind:value={mortgageBase.interestRate} type="range" min="0.1" max="100" step="0.1" tabindex="-1" />
</label>

<label for="numberOfPayments">
    Liczba rat
    <br />
    <input bind:value={mortgageBase.numberOfPayments} type="number" id="numberOfPayments" min="1" max="600" step="1" />
    <br />
    <input bind:value={mortgageBase.numberOfPayments} type="range" min="1" max="600" step="1" tabindex="-1" />
    <br />
    ({ toYearsAndMonthsHint(mortgageBase.numberOfPayments) })
</label>