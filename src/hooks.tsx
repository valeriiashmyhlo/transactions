import { useEffect, useState } from "react";
import { Transaction } from "./types";

type Optional<T> = T | null;

export const useTransactions = (
  getTransactions: () => Promise<Transaction[]>
): [Transaction[], boolean, Optional<Error>] => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState<Optional<Error>>(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoaded(false);
      try {
        const transactions = await getTransactions();
        if (ignore) return;
        setTransactions(transactions);
      } catch (error) {
        setError(error);
      } finally {
        if (ignore) return;
        setLoaded(true);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [getTransactions]);

  return [transactions, isLoaded, error];
};
