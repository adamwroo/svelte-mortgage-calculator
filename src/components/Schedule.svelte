<script>
    import AlternativeInfo from './alternatives/AlternativeInfo.svelte';
    import ScheduleDialog from './schedule/ScheduleDialog.svelte';
    import InfoGrid from './shared/InfoGrid.svelte';
    import { toPLN, toYearsAndMonthsHint } from '../utils';
    import { selectOnFocus } from '../actions';
    import { getScheduleData, round } from '../calculations'; // todo: should `round` be removed?

    export let mortgage;
    export let overpayments = [];
    export let decreaseInstallmentAfterOverpayment;
    export let highlightRowWithOverpay;

    let showingDialog = false;
    let scheduleData = [];

    $: overpaymentsSum = overpayments.reduce((sum, overpayment) => sum + overpayment, 0);

    const updateScheduleData = (mortgage, oldOverpaymentsTest, decreaseInstallmentAfterOverpayment) => {
        let { payments, newOverpayments } = getScheduleData(mortgage, oldOverpaymentsTest, decreaseInstallmentAfterOverpayment);
        overpayments = newOverpayments;
        scheduleData = payments;
    }

    $: updateScheduleData(mortgage, overpayments, decreaseInstallmentAfterOverpayment);

    const clearOverpayments = () => {
        overpayments = new Array(mortgage.numberOfPayments).fill(0);
    }

    const openDialog = () => {
        showingDialog = true;
    }

    const closeDialog = () => {
        showingDialog = false;
    }

    const updateScheduleOnSave = overpayment => {
        const { overpaymentAmount, overpaymentFrequency, overwrite } = overpayment;
        let newOverpayments = [...overpayments];

        for (let i = 0; i < newOverpayments.length; i++) {
            const month = i + 1;
            if (month % overpaymentFrequency == 0) {
                if (overwrite) {
                    newOverpayments[i] = overpaymentAmount;
                } else {
                    newOverpayments[i] += overpaymentAmount;
                }
            }
        }

        overpayments = newOverpayments;
        closeDialog()
    }
</script>

<div class="schedule-container">
<InfoGrid>
    <span>Całkowita nadpłata:</span><span>{ toPLN(overpaymentsSum) }</span>
    <span>Liczba rat:</span><span>{scheduleData.length} ({toYearsAndMonthsHint(scheduleData.length)})</span>
    <span></span>
    <span>
        <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={scheduleData.length} />
        <AlternativeInfo oldValue={mortgage.numberOfPayments} newValue={scheduleData.length} type="years-and-months" />
    </span>
    <span>Koszt odsetek:</span>
    <span>
        <!-- todo: sum shouldn't take place here (in calculations? object?) -->
        { toPLN(scheduleData.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0)) }
        <AlternativeInfo oldValue={mortgage.getInterestCost()} newValue={scheduleData.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0)} type="currency" />
    </span>
</InfoGrid>

<div class="overpayment-form">
    <div>
        <label>
            <input type="checkbox" bind:checked={decreaseInstallmentAfterOverpayment} />
            Zmniejsz wysokość raty po nadpłacie
        </label>
    </div>
    <div>
        <label>
            <input type="checkbox" bind:checked={highlightRowWithOverpay} />
            Zaznacz miesiące z nadpłatą
        </label>
    </div>
    <div class="buttons">
        <button class="primary" on:click={() => openDialog()}>Dodaj nadpłatę</button>
        <button class="secondary" on:click={() => clearOverpayments()}>Usuń nadpłaty</button>
    </div>
</div>

{#if showingDialog}
    <ScheduleDialog
        mortgageAmount={mortgage.amount}
        on:cancel={closeDialog}
        on:save={e => updateScheduleOnSave(e.detail)}
    />
{/if}

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
            <tr class:with-overpayment={highlightRowWithOverpay && overpayments[payment.month - 1] > 0}>
                <td class="hint" title={toYearsAndMonthsHint(payment.month)}>{payment.month}</td>
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

</div>

<style>
    .schedule-container {
        --base-gap: 0.25em;
        display: flex;
        flex-direction: column;
        gap: var(--base-gap);
        padding-top: var(--base-gap);
    }

    .overpayment-form {
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .buttons {
        align-self: flex-end;
        padding-top: calc(var(--base-gap) / 2);
    }

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

    tr.with-overpayment td {
        color: var(--accent-color);
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
        margin: 0;
    }

    .hint {
        cursor: help;
    }
</style>
