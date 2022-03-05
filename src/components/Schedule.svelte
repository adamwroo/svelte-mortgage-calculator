<script>
    import { toPLN } from "../utils";
    import { selectOnFocus } from '../actions';

    export let mortgage;
    export let overpayments;

    const overpaymentChanged = (month) => {
        console.log(`month: ${month}`);
    }

    $: {
        console.log("----");
        console.log(`mortgage.numberOfPayments: ${mortgage.numberOfPayments}`);
        console.log(`overpayments.length: ${overpayments.length}`);

        // todo: preserve overpayments array while changing `numberOfPayments`
        // when `numberOfPayments` is replaced (whole value typed anew instead of +/-) some values are lost
        if (mortgage.numberOfPayments < overpayments.length) {
            overpayments.splice(mortgage.numberOfPayments, overpayments.length - mortgage.numberOfPayments);
            overpayments = overpayments;
        }
        else if (mortgage.numberOfPayments > overpayments.length) {
            overpayments.splice(overpayments.length, 0, ...(new Array(mortgage.numberOfPayments - overpayments.length).fill(0)));
            overpayments = overpayments;
        }
    }

    $: console.log(overpayments);
</script>

<h2>Harmonogram spłaty:</h2>

<div>
    <table>
        <tr>
            <th>LP</th>
            <th>Raty kapitałowe</th>
            <th>Raty odsetkowe</th>
            <th>Razem do zapłaty</th>
            <th>Nadpłata</th>
        </tr>
        {#each mortgage.monthlyPayments as payment (payment.month)}
            <tr>
                <td>{payment.month}</td>
                <td>{toPLN(payment.interestInstallment)}</td>
                <td>{toPLN(payment.capitalInstallment)}</td>
                <td>
                    {toPLN(payment.interestInstallment + payment.capitalInstallment)}
                </td>
                <td>
                    <input
                        bind:value={overpayments[payment.month - 1]}
                        on:change={() => overpaymentChanged(payment.month)}
                        use:selectOnFocus
                        type="number" min="0" max="10000000" step="100" autocomplete="off"
                    />
                </td>
            </tr>
        {/each}
    </table>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
    }

    table {
        border-collapse: collapse;
    }

    td, th {
        border: 1px solid var(--background-color-table);
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: var(--background-color-table);
    }
</style>
