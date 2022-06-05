<script>
    import IntersectionObserver from "svelte-intersection-observer";
    import InputNumber from '../shared/InputNumber.svelte';
    import { toPLN, toYearsAndMonthsHint } from '../../utils';

    export let highlightRowWithOverpay;
    export let overpayment;
    export let payment;
    export let maxOverpayment;

    let element;
</script>

<IntersectionObserver {element} let:intersecting>
    <tr bind:this={element} class:with-overpayment={highlightRowWithOverpay && overpayment > 0}>
        <td class="hint" title={toYearsAndMonthsHint(payment.month)}>{payment.month}</td>
        <td>
            {#if intersecting}
                <InputNumber
                    bind:value={overpayment}
                    min={0}
                    max={maxOverpayment}
                    step={100}
                    decimalPlaces={0}
                    ariaLabel="nadpłata miesiąc {payment.month}"
                 />
            {:else}
                <input value="0" type="number" aria-label="nadpłata miesiąc {payment.month}">
            {/if}
        </td>
        <td>
            {#if intersecting}
                {toPLN(payment.capitalInstallment)}
            {:else}
                -
            {/if}
        </td>
        <td>
            {#if intersecting}
                {toPLN(payment.interestInstallment)}
            {:else}
                -
            {/if}
        </td>
        <td>
            {#if intersecting}
                {toPLN(payment.interestInstallment + payment.capitalInstallment)}
            {:else}
                -
            {/if}
        </td>
        <td>
            {#if intersecting}
                {toPLN(payment.capitalToRepay)}
            {:else}
                -
            {/if}
        </td>
    </tr>
</IntersectionObserver>