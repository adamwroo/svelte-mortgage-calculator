import { localStore } from "./localStore";

const initialMorgage = { amount: 350000, interestRate: 2, numberOfPayments: 360 };
export const mortgage = localStore('mortgage-info', initialMorgage);