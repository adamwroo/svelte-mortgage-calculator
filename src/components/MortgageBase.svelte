<script>
    import InputNumber from './shared/InputNumber.svelte';
    import { toYearsAndMonthsHint } from '../utils';

    export let mortgageBase;
</script>

<h2>Kredyt</h2>

<label for="amount-base">
    <span>Kwota</span>
    <InputNumber bind:value={mortgageBase.amount} id="amount-base" min={1000} max={1000000} step={100} decimalPlaces={2} />
    <input bind:value={mortgageBase.amount} type="range" min="1000" max="1000000" tabindex="-1" />
</label>

<label for="interest-rate-base">
    <span>Oprocentowanie</span>
    <InputNumber bind:value={mortgageBase.interestRate} id="interest-rate-base" min={1} max={50} step={0.01} decimalPlaces={2} />
    <input bind:value={mortgageBase.interestRate} type="range" min="1" max="20" step="0.01" tabindex="-1" />
</label>

<label for="number-of-payments-base">
    <span>Liczba rat</span>
    <InputNumber bind:value={mortgageBase.numberOfPayments} id="number-of-payments-base" min={1} max={360} step={1} decimalPlaces={0} />
    <input class="with-hint" bind:value={mortgageBase.numberOfPayments} type="range" min="1" max="360" tabindex="-1" />
    <span class="hint">({ toYearsAndMonthsHint(mortgageBase.numberOfPayments) })</span>
</label>

<style>
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input.with-hint {
        margin-bottom: 0;
    }

    span.hint {
        font-size: 0.95em;
    }
</style>