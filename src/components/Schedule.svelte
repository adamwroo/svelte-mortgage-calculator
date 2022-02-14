<script>
    import { toPLN } from "../utils";

    export let mortgage;
</script>

<h2>Harmonogram spłaty:</h2>

<div>
    <table>
        <tr>
            <th>LP</th>
            <th>Raty kapitałowe</th>
            <th>Raty odsetkowe</th>
            <th>Razem do zapłaty</th>
        </tr>
        {#each mortgage.monthlyPayments as payment (payment.month)}
            <tr>
                <td>{payment.month}</td>
                <td>{toPLN(payment.interestInstallment)}</td>
                <td>{toPLN(payment.capitalInstallment)}</td>
                <td>
                    {toPLN(payment.interestInstallment + payment.capitalInstallment)}
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
