export const getMortgage = (mortgageBase) => {
    const monthlyInstallment = calculateMonthlyInstallment(mortgageBase.amount, mortgageBase.interestRate, mortgageBase.numberOfPayments);
    const monthlyPayments = getMonthlyPayments(mortgageBase.amount, mortgageBase.interestRate, mortgageBase.numberOfPayments, monthlyInstallment);

    return {
        ...mortgageBase,
        monthlyInstallment,
        monthlyPayments,
        getInterestCost: () => monthlyPayments.reduce((sum, {interestInstallment}) => sum + interestInstallment, 0)
    };
}

export const recalculate = (mortgage, alternative) => {
    const newAmount = Math.max(mortgage.amount - alternative.overpayment, 0);
    const newInterestRate = Math.max(mortgage.interestRate + alternative.interestRateChange, 0);

    if (newAmount <= 0 || newInterestRate <= 0 || mortgage.numberOfPayments == 0 || mortgage.monthlyInstallment <= 0) return null;

    if (alternative.adjustType === 'adjust-number-of-payments') {
        const newNumberOfPayments = calculateNumberOfPayments(newAmount, newInterestRate, mortgage.monthlyInstallment);
        return getMortgage({ amount: newAmount, interestRate: newInterestRate, numberOfPayments: newNumberOfPayments });
    } else {
        // alternative.adjustType ==='adjust-installment'
        return getMortgage({ amount: newAmount, interestRate: newInterestRate, numberOfPayments: mortgage.numberOfPayments });
    }
}

/**
* see: https://finanse.rankomat.pl/poradniki/obliczyc-rate-kredytu-gotowkowego
*/
const calculateMonthlyInstallment = (amount, interestRate, numberOfPayments) => {
    if (numberOfPayments <= 0) return 0;

    // sigma notation summation
    let sigma = 0.0;
    for (let i = 1.0; i <= numberOfPayments; i++)
    {
        sigma += Math.pow(1.0 + interestRate / 100 / 12, -i);
    }

    return amount / sigma;
}

const getMonthlyPayments = (amount, interestRate, numberOfPayments, monthlyInstallment) => {
    if (amount <= 0 || interestRate <= 0 || numberOfPayments <= 0 || monthlyInstallment <= 0) return [];

    let payments = [];
    let capitalToRepay = amount;
    for (let i = 1; i <= numberOfPayments; i++)
    {
        let interestInstallment = capitalToRepay * interestRate / 100 / 12;
        let payment = { month: i, interestInstallment: interestInstallment, capitalInstallment: monthlyInstallment - interestInstallment};
        payments.push(payment);

        // decrease capital for the next month
        capitalToRepay -= payment.capitalInstallment;
    }

    return payments;
}

/**
* see: https://www.aviva.pl/blog-porady/dom-i-mieszkanie/2020/jak-obliczyc-rate-kredytu-hipotecznego/
*/
const calculateNumberOfPayments = (amount, interestRate, monthlyInstallment) => {
    const base = 12 / (12 + interestRate / 100);
    const number = 1 - amount * interestRate / 100 / monthlyInstallment / 12;

    // todo: should roud or up/down?
    return Math.round(Math.log(number) / Math.log(base));
}