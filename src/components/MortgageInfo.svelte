<script>
    import { toYearsAndMonthsHint } from '../utils';
    export let mortgage;
</script>

<p>
    Kwota: {mortgage.amount}
</p>
<p>
    Oprocentowanie: {mortgage.interestRate}%
</p>
<p>
    Liczba rat: {mortgage.numberOfPayments} ({ toYearsAndMonthsHint(mortgage.numberOfPayments) })
</p>