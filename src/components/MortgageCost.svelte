<script>
    import { getInterestCost } from '../calculations';
    import { toPLN } from '../utils';

    export let mortgage;
</script>

<h2>Koszt:</h2>
Miesięczna rata: <b>{ toPLN(mortgage.monthlyInstallment) }</b>
<br />
Całkowity koszt odsetek: <b>{ toPLN(getInterestCost(mortgage.monthlyPayments)) }</b>