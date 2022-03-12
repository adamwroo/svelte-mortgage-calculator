<script>
    import { toPLN } from "../utils";
    import { selectOnFocus } from '../actions';    
    import { getScheduleData } from '../calculations';

    export let mortgage;
    export let overpayments;

    let adjustType = 'adjust-installment' // 'adjust-installment' or 'adjust-number-of-payments'
    let scheduleData = [];

    const updateScheduleData = (mortgage, overpayments, adjustType) => {
        updateOverpaymentsLength();
        scheduleData = getScheduleData(mortgage, overpayments, adjustType);
    }

    const updateOverpaymentsLength = () => {
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

    $: updateScheduleData(mortgage, overpayments, adjustType);

    const clearOverpayments = () => {
        overpayments = new Array(mortgage.numberOfPayments).fill(0);
    }
</script>

<h2>Harmonogram spłaty:</h2>
<button on:click={() => clearOverpayments()}>Usuń nadpłaty</button>
<div>
    <label>
        <input type="radio" bind:group={adjustType} name="adjust-type" value="adjust-installment" />
        Zmniejsz wysokość raty
    </label>
    <label>
        <input type="radio" bind:group={adjustType} name="adjust-type" value="adjust-number-of-payments" />
        Zmniejsz liczbę rat
    </label>
</div>

<div class="table-container">
    <table>
        <tr>
            <th>LP</th>
            <th>Raty kapitałowe</th>
            <th>Raty odsetkowe</th>
            <th>Raty</th>
            <th>Nadpłata</th>
            <th>Pozostały kapitał</th>
        </tr>
        {#each scheduleData as payment (payment.month)}
            <tr>
                <td>{payment.month}</td>
                <td>{toPLN(payment.capitalInstallment)}</td>
                <td>{toPLN(payment.interestInstallment)}</td>
                <td>
                    {toPLN(payment.interestInstallment + payment.capitalInstallment)}
                </td>
                <td>
                    <input
                        bind:value={overpayments[payment.month - 1]}
                        use:selectOnFocus
                        type="number" min="0" max="10000000" step="100" autocomplete="off"
                    />
                </td>
                <td>{toPLN(payment.capitalToRepay)}</td>
            </tr>
        {/each}
    </table>
</div>

<style>
    div.table-container {
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
