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
    const newAmount = round(Math.max(mortgage.amount - alternative.overpayment, 0));
    const newInterestRate = round(Math.max(mortgage.interestRate + alternative.interestRateChange, 0));

    if (newAmount <= 0 || newInterestRate <= 0 || mortgage.numberOfPayments == 0 || mortgage.monthlyInstallment <= 0) return null;

    if (alternative.adjustType === 'adjust-number-of-payments') {
        // when interest rate has changed, monthly installment has to be recalculated accordingly
        const recalculatedMonthlyInstallment = getMortgage({ amount: mortgage.amount, interestRate: newInterestRate, numberOfPayments: mortgage.numberOfPayments }).monthlyInstallment;
        const newNumberOfPayments = calculateNumberOfPayments(newAmount, newInterestRate, recalculatedMonthlyInstallment);
        return getMortgage({ amount: newAmount, interestRate: newInterestRate, numberOfPayments: newNumberOfPayments });
    } else {
        // alternative.adjustType ==='adjust-installment'
        return getMortgage({ amount: newAmount, interestRate: newInterestRate, numberOfPayments: mortgage.numberOfPayments });
    }
}

export const getScheduleData = (mortgage, overpayments, decreaseInstallmentAfterOverpayment) => {
    return getMonthlySchedule(mortgage.amount, mortgage.interestRate, mortgage.numberOfPayments, mortgage.monthlyInstallment, overpayments, decreaseInstallmentAfterOverpayment);
}

// todo: shoudn't be exported, should be used only internally
export const round = (number) => {
    return Number.parseFloat(number.toFixed(2));
}

/**
* see: https://finanse.rankomat.pl/poradniki/obliczyc-rate-kredytu-gotowkowego
*/
const calculateMonthlyInstallment = (amount, interestRate, numberOfPayments) => {
    if (amount <= 0 || numberOfPayments <= 0) return 0;

    // sigma notation summation
    let sigma = 0.0;
    for (let i = 1.0; i <= numberOfPayments; i++)
    {
        sigma += Math.pow(1.0 + interestRate / 100 / 12, -i);
    }

    return amount / sigma;
}

const getMonthlyPayments = (amount, interestRate, numberOfPayments, monthlyInstallment) => {
    if (amount <= 0 || interestRate <= 0 || numberOfPayments <= 0 || monthlyInstallment <= 0) return []; // todo: test if [] returned

    let payments = [];
    let capitalToRepay = amount;

    for (let i = 1; i <= numberOfPayments; i++) {
        let interestInstallment = capitalToRepay * interestRate / 100 / 12;
        let payment = { month: i, interestInstallment: interestInstallment, capitalInstallment: monthlyInstallment - interestInstallment };
        payments.push(payment);

        // decrease capital for next month
        capitalToRepay = capitalToRepay - payment.capitalInstallment;
    }

    return payments;
}

const getMonthlySchedule = (amount, interestRate, numberOfPayments, monthlyInstallment, overpayments, decreaseInstallmentAfterOverpayment) => {
    if (amount <= 0 || interestRate <= 0 || numberOfPayments <= 0 || monthlyInstallment <= 0) return [];

    let payments = [];
    let capitalToRepay = amount;
    let newOverpayments = [];

    for (let i = 1; i <= numberOfPayments; i++) {
        // overpayment happens first
        let overpayment = overpayments?.[i - 1] ?? 0;
        overpayment = Math.max(overpayment, 0);
        // overpayment can't be larger than capital left to repay
        overpayment = Math.min(overpayment, capitalToRepay);
        newOverpayments.push(overpayment);

        // decrease capital by overpayment (this happens BEFORE installment is paid)
        capitalToRepay = capitalToRepay - overpayment;

        // recalculate installment after overpayment (if selected)
        if (overpayment > 0 && decreaseInstallmentAfterOverpayment) {
            monthlyInstallment = calculateMonthlyInstallment(capitalToRepay, interestRate, numberOfPayments - i + 1);
        }

        let interestInstallment = capitalToRepay * interestRate / 100 / 12;
        // installment can't be larger than capital left to repay (relevant for last month)
        let capitalInstallment = Math.min(monthlyInstallment - interestInstallment, capitalToRepay);

        // decrease capital for next month
        capitalToRepay = capitalToRepay - capitalInstallment;
        let payment = { month: i, interestInstallment, capitalInstallment, capitalToRepay };
        payments.push(payment);

        if (capitalToRepay == 0) break;
    }

    return { payments, newOverpayments };
}

/**
* see: https://www.aviva.pl/blog-porady/dom-i-mieszkanie/2020/jak-obliczyc-rate-kredytu-hipotecznego/
*/
const calculateNumberOfPayments = (amount, interestRate, monthlyInstallment) => {
    const base = 12 / (12 + interestRate / 100);
    const number = 1 - amount * interestRate / 100 / monthlyInstallment / 12;

    // todo: should round or floor/ceil?
    return Math.max(Math.floor(Math.log(number) / Math.log(base)), 1);
}