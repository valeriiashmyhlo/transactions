import React, { useState, FC } from "react";
import styles from "./App.module.css";
import { useTransactions } from "./hooks";
import { Transaction } from "./types";

type Quantity = 5 | 10 | 15 | "all";

const App: FC<{ getTransactions: () => Promise<Transaction[]> }> = ({
  getTransactions,
}) => {
  const [isFilterActive, setFilterActive] = useState(false);
  const [quantity, setQuantity] = useState<Quantity>("all");
  const [transactions, isLoaded, error] = useTransactions(getTransactions);

  const quantityOptions: Quantity[] = [5, 10, 15, "all"];

  let currentTransactions = transactions;
  if (isFilterActive) {
    currentTransactions = [...currentTransactions]
      .sort((a, b) => b.amount.value - a.amount.value)
      .filter(({ amount }) => amount.value < 0);
  }
  if (quantity !== "all") {
    currentTransactions = currentTransactions.slice(0, quantity);
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div>
          <input
            id="filter"
            type="checkbox"
            checked={isFilterActive}
            onChange={() => setFilterActive(!isFilterActive)}
          />
          <label htmlFor="filter">Smallest expenses</label>
        </div>
        <div>
          <label htmlFor="quantity">Quantity: </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value as Quantity)}
            id="quantity"
          >
            {quantityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoaded ? (
            error ? (
              <tr>
                <td colSpan={3}>
                  Sorry, there was an error loading your products
                </td>
              </tr>
            ) : (
              currentTransactions.map(
                ({ id, amount, description, category_title, date }) => (
                  <tr key={id}>
                    <td>{description}</td>
                    <td>
                      {amount.value} {amount.currency_iso}
                    </td>
                    <td>{category_title}</td>
                    <td>{date}</td>
                  </tr>
                )
              )
            )
          ) : (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
