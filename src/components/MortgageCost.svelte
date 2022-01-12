<script>
    import { calculateMonthlyInstallment, getMonthlyPayments } from '../calculations';
    import { toPLN } from '../utils';

    export let mortgageBase;

    $: monthlyInstallment = calculateMonthlyInstallment(mortgageBase.amount, mortgageBase.interestRate, mortgageBase.numberOfPayments);
    $: monthlyPayments = getMonthlyPayments(mortgageBase.amount, mortgageBase.interestRate, mortgageBase.numberOfPayments, monthlyInstallment);

    $: interestCost = monthlyPayments.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0);
</script>

<h2>Koszt:</h2>
Miesięczna rata: { toPLN(monthlyInstallment) }
<br />
Całkowity koszt odsetek : { toPLN(interestCost) }