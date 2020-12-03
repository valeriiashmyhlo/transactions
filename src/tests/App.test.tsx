import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockTransactions } from "./mockData";
import App from "../App";

const getTransactions = async () => MockTransactions;

describe("App", () => {
  it("should render App component", async () => {
    const { container, getByText } = render(
      <App getTransactions={getTransactions} />
    );
    expect(container.firstChild).toMatchSnapshot();
    await waitFor(() => getByText("Smallest expenses"));
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should filter by smallest expenses on check "Smallest expenses" checkbox', async () => {
    const { container, getByLabelText } = render(
      <App getTransactions={getTransactions} />
    );
    const checkbox = await waitFor(() => getByLabelText("Smallest expenses"));
    fireEvent.click(checkbox);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(checkbox);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should filter quantity", async () => {
    const { container, getByLabelText } = render(
      <App getTransactions={getTransactions} />
    );
    const select = await waitFor(() => getByLabelText("Quantity:"));
    fireEvent.change(select, { target: { value: 5 } });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(select, { target: { value: 10 } });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(select, { target: { value: 15 } });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(select, { target: { value: "all" } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
