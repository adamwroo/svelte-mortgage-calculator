<script>
    import ScheduleDataRow from './ScheduleDataRow.svelte';
    import ScheduleDialog from './ScheduleDialog.svelte';

    export let scheduleData;
    export let overpayments;
    export let mortgageAmount;
    export let decreaseInstallmentAfterOverpayment;
    export let highlightRowWithOverpay;

    let showingDialog = false;

    const clearOverpayments = () => {
        overpayments = new Array(overpayments.length).fill(0);
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

    const getMaxOverpayment = (month) => {
        if(month == 1) return mortgageAmount;

        return Math.ceil(scheduleData[month - 2].capitalToRepay / 100) * 100;
    }
</script>

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
        {mortgageAmount}
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
            <ScheduleDataRow
                { highlightRowWithOverpay }
                bind:overpayment={overpayments[payment.month - 1]}
                { payment }
                maxOverpayment={getMaxOverpayment(payment.month)}
            />
        {/each}
    </table>
</div>

<style>
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

    :global(tr.with-overpayment td) {
        color: var(--accent-color);
    }

    :global(td, th) {
        border: 1px solid var(--background-color-table);
        text-align: left;
        padding: 8px;
    }

    :global(tr:nth-child(even)) {
        background-color: var(--background-color-table);
    }

    :global(.table-container td > input) {
        width: 10ch;
        margin: 0;
    }

    :global(.hint) {
        cursor: help;
    }
</style>