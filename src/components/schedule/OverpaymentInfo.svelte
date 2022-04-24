<script>
    import InfoGrid from '../shared/InfoGrid.svelte';
    import AlternativeInfo from '../alternatives/AlternativeInfo.svelte';
    import { toPLN, toYearsAndMonthsHint } from '../../utils';

    export let mortgage;
    export let scheduleData;
    export let overpayments;

    $: overpaymentsSum = overpayments.reduce((sum, overpayment) => sum + overpayment, 0);
    $: interestInstallmentSum = scheduleData.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0); // todo: sum shouldn't take place here (in calculations? object?)
</script>

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
        { toPLN(interestInstallmentSum) }
        <AlternativeInfo oldValue={mortgage.getInterestCost()} newValue={interestInstallmentSum} type="currency" />
    </span>
</InfoGrid>