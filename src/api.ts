import { Transaction } from './types';

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(
      "http://www.mocky.io/v2/5c62e7c33000004a00019b05"
    );
    const { transactions } = await response.json();

    return transactions;
  } catch (error) {
    throw error;
  }
};
