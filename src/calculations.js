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

/**
* see: https://finanse.rankomat.pl/poradniki/obliczyc-rate-kredytu-gotowkowego
*/
export const calculateMonthlyInstallment = (amount, interestRate, numberOfPayments) => {
    if (numberOfPayments <= 0) return 0;

    // sigma notation summation
    let sigma = 0.0;
    for (let i = 1.0; i <= numberOfPayments; i++)
    {
        sigma += Math.pow(1.0 + interestRate / 100 / 12, -i);
    }

    return amount / sigma;
}

export const getMonthlyPayments = (amount, interestRate, numberOfPayments, monthlyInstallment) => {
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