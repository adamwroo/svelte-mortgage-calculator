<script>
    import OverpaymentInfo from './schedule/OverpaymentInfo.svelte';
    import ScheduleWithOverpayments from './schedule/ScheduleWithOverpayments.svelte';
    import { getScheduleDataWithOverpayments } from '../calculations';

    export let mortgage;
    export let overpayments = [];
    export let decreaseInstallmentAfterOverpayment;
    export let highlightRowWithOverpay;

    $: scheduleData = getScheduleDataWithOverpayments(mortgage, { overpayments, decreaseInstallmentAfterOverpayment });
</script>

<div class="schedule-container">
    <OverpaymentInfo {mortgage} {scheduleData} {overpayments} />
    <ScheduleWithOverpayments
        {scheduleData}
        bind:overpayments={overpayments}
        mortgageAmount={mortgage.amount}
        bind:decreaseInstallmentAfterOverpayment={decreaseInstallmentAfterOverpayment}
        {highlightRowWithOverpay}
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