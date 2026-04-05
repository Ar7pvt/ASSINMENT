import React from 'react';
import { useFinance } from '../context/FinanceContext';

const Insights: React.FC = () => {
  const { transactions } = useFinance();

  const categorySpending: { [key: string]: number } = {};
  transactions.filter((t) => t.type === 'expense').forEach((t) => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + Math.abs(t.amount);
  });
  const highestCategory = Object.entries(categorySpending).reduce(
    (max, [cat, amt]) => (amt > max.amount ? { category: cat, amount: amt } : max),
    { category: '', amount: 0 }
  );

  const monthlyData: { [key: string]: { income: number; expense: number } } = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };
    if (t.type === 'income') {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += Math.abs(t.amount);
    }
  });

  const monthlyComparison = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense,
    net: data.income - data.expense,
  }));

  const expenses = transactions.filter((t) => t.type === 'expense');
  const avgExpense = expenses.length > 0 ? expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0) / expenses.length : 0;

  return (
    <div className="space-y-8">
      <section className="surface p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80 dark:text-cyan-300/80">Performance summary</p>
            <h2 className="mt-2 text-3xl font-semibold text-white dark:text-white">Data-driven insights</h2>
            <p className="mt-2 text-slate-400 dark:text-slate-400">Strong signals, sharpened performance, and real finance intelligence.</p>
          </div>
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="min-w-0 rounded-3xl bg-slate-900/80 p-5 dark:bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400 dark:text-slate-400">Top expense</p>
              <p className="mt-3 text-xl font-semibold text-white dark:text-white">{highestCategory.category || 'None'}</p>
              <p className="text-slate-400 dark:text-slate-400">${highestCategory.amount.toFixed(2)}</p>
            </div>
            <div className="min-w-0 rounded-3xl bg-slate-900/80 p-5 dark:bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400 dark:text-slate-400">Avg. expense</p>
              <p className="mt-3 text-xl font-semibold text-amber-400">${avgExpense.toFixed(2)}</p>
            </div>
            <div className="min-w-0 rounded-3xl bg-slate-900/80 p-5 dark:bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400 dark:text-slate-400">Transactions</p>
              <p className="mt-3 text-xl font-semibold text-cyan-400">{transactions.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="surface p-6">
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-white dark:text-white">Monthly Comparison</h3>
            <p className="text-sm text-slate-400 dark:text-slate-400">Track income, expense, and net flow month over month.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300 dark:text-slate-300">
              <thead className="border-b border-slate-800 text-slate-400 dark:border-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3 text-right">Income</th>
                  <th className="px-4 py-3 text-right">Expenses</th>
                  <th className="px-4 py-3 text-right">Net</th>
                </tr>
              </thead>
              <tbody>
                {monthlyComparison.map(({ month, income, expense, net }) => (
                  <tr key={month} className="border-b border-slate-800 last:border-0 dark:border-slate-800">
                    <td className="px-4 py-4 text-slate-200 dark:text-slate-200">{month}</td>
                    <td className="px-4 py-4 text-right text-emerald-400">${income.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right text-rose-400">${expense.toFixed(2)}</td>
                    <td className={`px-4 py-4 text-right ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ${net.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <div className="surface p-6">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">Spending categories</h3>
            <ul className="space-y-3">
              {Object.entries(categorySpending)
                .sort(([, a], [, b]) => b - a)
                .map(([cat, amt]) => (
                  <li key={cat} className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-4 py-3 dark:bg-slate-900/80">
                    <span className="text-slate-200 dark:text-slate-200">{cat}</span>
                    <span className="font-semibold text-slate-100 dark:text-slate-100">${amt.toFixed(2)}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="surface p-6">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {transactions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 px-4 py-4 dark:bg-slate-900/80">
                    <div>
                      <p className="font-medium text-white dark:text-white">{t.category}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-semibold ${t.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ${Math.abs(t.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Insights;
