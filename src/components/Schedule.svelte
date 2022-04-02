<script>
    import AlternativeInfo from "./alternatives/AlternativeInfo.svelte";
    import { toPLN, toYearsAndMonthsHint } from "../utils";
    import { selectOnFocus } from '../actions';
    import { getScheduleData } from '../calculations';

    export let mortgage;
    export let overpayments;
    export let decreaseInstallmentAfterOverpayment;

    let scheduleData = [];

    const updateScheduleData = (mortgage, overpayments, decreaseInstallmentAfterOverpayment) => {
        updateOverpaymentsLength();
        scheduleData = getScheduleData(mortgage, overpayments, decreaseInstallmentAfterOverpayment);

        if (scheduleData.length < overpayments.length) {
            overpayments.splice(scheduleData.length, overpayments.length - scheduleData.length);
            overpayments = overpayments;
        }
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

    $: updateScheduleData(mortgage, overpayments, decreaseInstallmentAfterOverpayment);

    const clearOverpayments = () => {
        overpayments = new Array(mortgage.numberOfPayments).fill(0);
    }

    // todo: workaround because the actual values have more than 2 decimal places
    const getOverpaymentMax = (month) => month == 1 ? Math.floor(mortgage.amount) + 1 : Math.floor(scheduleData[month - 2].capitalToRepay) + 1;

    const updateOverpaymentsMinMaxes = (month) => {
        if (overpayments[month - 1] < 0) {
            overpayments[month - 1] = 0;
            return;
        }

        let max = getOverpaymentMax(month);
        if (overpayments[month - 1] > max) {
            overpayments[month - 1] = max;
        }
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
<button on:click={() => clearOverpayments()}>Usuń nadpłaty</button>
<div>
    <label>
        <input type="checkbox" bind:checked={decreaseInstallmentAfterOverpayment} />
        Zmniejsz wysokość raty po nadpłacie
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
                        type="number" min="0"
                        max="{getOverpaymentMax(payment.month)}"
                        autocomplete="off"
                        on:input={() => updateOverpaymentsMinMaxes(payment.month)} 
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

    td > input {
        width: 10ch;
    }
</style>
