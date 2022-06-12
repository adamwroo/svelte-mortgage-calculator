<script>
    import OverpaymentInfo from './schedule/OverpaymentInfo.svelte';
    import ScheduleWithOverpayments from './schedule/ScheduleWithOverpayments.svelte';
    import { getScheduleData } from '../calculations';

    export let mortgage;
    export let overpayments = [];
    export let decreaseInstallmentAfterOverpayment;
    export let highlightRowWithOverpay;

    $: scheduleData = getScheduleData(mortgage, { overpayments, decreaseInstallmentAfterOverpayment } );

    const handleOverpaymentsUpdated = (overpayment) => {
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
    }

    const handleOverpaymentUpdated = (overpayment) => {
        overpayments[overpayment.month - 1] = overpayment.amount;
    }

    const handleClearOverpayments = () => {
        overpayments = new Array(overpayments.length).fill(0);
    }
</script>

<div class="schedule-container">
    <OverpaymentInfo {mortgage} {scheduleData} />
    <ScheduleWithOverpayments
        {scheduleData}
        mortgageAmount={mortgage.amount}
        bind:decreaseInstallmentAfterOverpayment={decreaseInstallmentAfterOverpayment}
        bind:highlightRowWithOverpay={highlightRowWithOverpay}
        on:overpaymentsUpdated={e => handleOverpaymentsUpdated(e.detail)}
        on:overpaymentUpdated={e => handleOverpaymentUpdated(e.detail)}
        on:clearOverpayments={handleClearOverpayments}
    />
</div>

<style>
    .schedule-container {
        --base-gap: 0.25em;
        display: flex;
        flex-direction: column;
        gap: var(--base-gap);
        padding-top: var(--base-gap);
    }
</style>