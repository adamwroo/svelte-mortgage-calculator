<script>
    import { calculateMonthlyInstallment, getMonthlyPayments } from '../calculations';

    export let mortgageBase;

    $: monthlyInstallment = calculateMonthlyInstallment(mortgageBase.amount, mortgageBase.interestRate, mortgageBase.numberOfPayments);
    $: monthlyPayments = getMonthlyPayments(mortgageBase.amount, mortgageBase.interestRate, mortgageBase.numberOfPayments, monthlyInstallment);

    $: interestCost = monthlyPayments.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0);
</script>

<h2>Koszt:</h2>
Miesięczna rata: { monthlyInstallment }
<br />
Całkowity koszt odsetek : { interestCost }