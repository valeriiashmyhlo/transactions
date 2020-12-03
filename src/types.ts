export interface Transaction {
  amount: { value: number; currency_iso: string };
  category_title: string;
  date: string;
  description: string;
  id: string;
}
