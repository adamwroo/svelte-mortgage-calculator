import { localStore } from "./localStore";

const numberOfPayments = 360;

const initialMorgageBase = { amount: 350000, interestRate: 2, numberOfPayments: numberOfPayments };
export const mortgageBase = localStore('mortgage-base', initialMorgageBase);

const initialAlternatives = [];
export const alternatives = localStore('alternatives', initialAlternatives);

const initialShowAlternatives = true;
export const showAlternatives = localStore('show-alternatives', initialShowAlternatives);

const initialOverpayments = new Array(numberOfPayments).fill(0);
export const overpayments = localStore('overpayments', initialOverpayments);

const initialDecreaseInstallmentAfterOverpayment= false;
export const decreaseInstallmentAfterOverpayment = localStore('decrease-installment-after-overpayment', initialDecreaseInstallmentAfterOverpayment);

const initialhighlightRowWithOverpay = false;
export const highlightRowWithOverpay = localStore('highlight-row-with-overpay', initialhighlightRowWithOverpay);