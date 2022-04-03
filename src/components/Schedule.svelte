<script>
    import AlternativeInfo from "./alternatives/AlternativeInfo.svelte";
    import { toPLN, toYearsAndMonthsHint } from "../utils";
    import { selectOnFocus } from '../actions';
    import { getScheduleData } from '../calculations';

    export let mortgage;
    export let overpayments = [];
    export let decreaseInstallmentAfterOverpayment;

    let scheduleData = [];

    const updateScheduleData = (mortgage, oldOverpaymentsTest, decreaseInstallmentAfterOverpayment) => {
        let { payments, newOverpayments } = getScheduleData(mortgage, oldOverpaymentsTest, decreaseInstallmentAfterOverpayment);
        overpayments = newOverpayments;
        scheduleData = payments;
    }

    $: updateScheduleData(mortgage, overpayments, decreaseInstallmentAfterOverpayment);

    const clearOverpayments = () => {
        overpayments = new Array(mortgage.numberOfPayments).fill(0);
    }
</script>

<p>
    Całkowita kwota nadpłaty: { toPLN(overpayments.reduce((sum, overpayment) => sum + overpayment, 0)) }
</p>
<p>
    Liczba rat: {scheduleData.length} ({toYearsAndMonthsHint(scheduleData.length)})
    <br />
    <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={scheduleData.length} />
    <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={scheduleData.length} type="years-and-months" />
</p>
<p>
    Całkowity koszt odsetek: { toPLN(scheduleData.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0)) }
    <AlternativeInfo oldValue={mortgage.getInterestCost()} newValue={scheduleData.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0)} type="currency" />
</p>
<div>
    <label>
        <input type="checkbox" bind:checked={decreaseInstallmentAfterOverpayment} />
        Zmniejsz wysokość raty po nadpłacie
    </label>
</div>
<button on:click={() => clearOverpayments()}>Usuń nadpłaty</button>

<div class="table-container">
    <table>
        <tr>
            <th>LP</th>
            <th>Nadpłaty</th>
            <th>Raty kapitałowe</th>
            <th>Raty odsetkowe</th>
            <th>Razem</th>
            <th>Pozostały kapitał</th>
        </tr>
        {#each scheduleData as payment (payment.month)}
            <tr>
                <td>{payment.month}</td>
                <td>
                    <input
                        bind:value={overpayments[payment.month - 1]}
                        use:selectOnFocus
                        type="number" min="0"
                        max={payment.month == 1 ? mortgage.amount : scheduleData[payment.month - 2].capitalToRepay}
                        autocomplete="off"
                    />
                </td>
                <td>{toPLN(payment.capitalInstallment)}</td>
                <td>{toPLN(payment.interestInstallment)}</td>
                <td>
                    {toPLN(payment.interestInstallment + payment.capitalInstallment)}
                </td>
                <td>{toPLN(payment.capitalToRepay)}</td>
            </tr>
        {/each}
    </table>
</div>

<style>
    .table-container {
        display: flex;
        /* 'center' breaks scrolling (some items not visible); 'safe center' not yet fully supported */
        /* justify-content: safe center; */
        overflow-x: auto;
    }
    
    table {
        border-collapse: collapse;
        /* workaround because 'justify-content: safe center' not yet fully supported */
        margin-left: auto;
        margin-right: auto;
}

    td, th {
        border: 1px solid var(--background-color-table);
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: var(--background-color-table);
    }

    td > input {
        width: 10ch;
    }
</style>
