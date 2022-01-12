import { localStore } from "./localStore";

const initialMorgageBase = { amount: 350000, interestRate: 2, numberOfPayments: 360 };
export const mortgageBase = localStore('mortgage-base', initialMorgageBase);