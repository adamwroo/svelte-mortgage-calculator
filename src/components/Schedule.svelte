<script>
    import OverpaymentInfo from './schedule/OverpaymentInfo.svelte';
    import ScheduleWithOverpayments from './schedule/ScheduleWithOverpayments.svelte';
    import { getScheduleData } from '../calculations';

    export let mortgage;
    export let overpayments = [];
    export let decreaseInstallmentAfterOverpayment;
    export let highlightRowWithOverpay;

    let scheduleData = [];
    $: {
        scheduleData = getScheduleData(mortgage, { overpayments, decreaseInstallmentAfterOverpayment });
        // clear remaining overpayments
        if (overpayments.length > scheduleData.length) {
            for (let i = scheduleData.length; i < overpayments.length; i++) {
                overpayments[i] = 0;
            }
        }
    }
</script>

<div class="schedule-container">
    <OverpaymentInfo {mortgage} {scheduleData} />
    <ScheduleWithOverpayments
        {scheduleData}
        bind:overpayments={overpayments}
        mortgageAmount={mortgage.amount}
        bind:decreaseInstallmentAfterOverpayment={decreaseInstallmentAfterOverpayment}
        bind:highlightRowWithOverpay={highlightRowWithOverpay}
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