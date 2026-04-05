export interface Transaction {
  id: string;
  date: string; // ISO string
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description?: string;
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-01-15', amount: 3000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '2', date: '2023-01-20', amount: -150, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: '2023-01-25', amount: -50, category: 'Transport', type: 'expense', description: 'Bus fare' },
  { id: '4', date: '2023-02-15', amount: 3000, category: 'Salary', type: 'income' },
  { id: '5', date: '2023-02-18', amount: -200, category: 'Entertainment', type: 'expense', description: 'Movie night' },
  { id: '6', date: '2023-02-22', amount: -100, category: 'Food', type: 'expense' },
  { id: '7', date: '2023-03-15', amount: 3000, category: 'Salary', type: 'income' },
  { id: '8', date: '2023-03-10', amount: -300, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
  { id: '9', date: '2023-03-20', amount: -80, category: 'Transport', type: 'expense' },
  { id: '10', date: '2023-03-25', amount: -250, category: 'Shopping', type: 'expense', description: 'Clothes' },
  { id: '11', date: '2023-04-15', amount: 3000, category: 'Salary', type: 'income' },
  { id: '12', date: '2023-04-05', amount: -120, category: 'Food', type: 'expense' },
  { id: '13', date: '2023-04-12', amount: -60, category: 'Transport', type: 'expense' },
  { id: '14', date: '2023-04-18', amount: -400, category: 'Rent', type: 'expense', description: 'Monthly rent' },
  { id: '15', date: '2023-05-15', amount: 3000, category: 'Salary', type: 'income' },
  { id: '16', date: '2023-05-08', amount: -180, category: 'Food', type: 'expense' },
  { id: '17', date: '2023-05-14', amount: -70, category: 'Transport', type: 'expense' },
  { id: '18', date: '2023-05-20', amount: -150, category: 'Entertainment', type: 'expense' },
];

export const categories = ['Salary', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Rent', 'Other'];