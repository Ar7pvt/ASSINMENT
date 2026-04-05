import React from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const Dashboard: React.FC = () => {
  const { transactions } = useFinance();

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let runningBalance = 0;
  const balanceData = sortedTransactions.map((t) => {
    runningBalance += t.amount;
    return {
      date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: Number(runningBalance.toFixed(2)),
    };
  });

  const categorySpending: { [key: string]: number } = {};
  transactions.filter((t) => t.type === 'expense').forEach((t) => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + Math.abs(t.amount);
  });
  const pieData = Object.entries(categorySpending).map(([name, value]) => ({ name, value }));
  const colors = ['#7c3aed', '#38bdf8', '#22c55e', '#fb7185', '#facc15'];

  return (
    <div className="space-y-8">
      <section className="surface p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-600/80 dark:text-cyan-300/80">Financial snapshot</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Your real-time balance</h2>
            <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">Track cash flow instantly with live insights, spending distribution, and trend momentum.</p>
          </div>
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="min-w-0 rounded-3xl bg-slate-100/80 p-5 shadow-[0_24px_80px_-40px_rgba(255,255,255,0.9)] dark:bg-slate-900/80 dark:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Balance</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-400">${totalBalance.toFixed(2)}</p>
            </div>
            <div className="min-w-0 rounded-3xl bg-slate-100/80 p-5 shadow-[0_24px_80px_-40px_rgba(255,255,255,0.9)] dark:bg-slate-900/80 dark:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Income</p>
              <p className="mt-3 text-3xl font-semibold text-cyan-400">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="min-w-0 rounded-3xl bg-slate-100/80 p-5 shadow-[0_24px_80px_-40px_rgba(255,255,255,0.9)] dark:bg-slate-900/80 dark:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Expenses</p>
              <p className="mt-3 text-3xl font-semibold text-rose-400">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
        <section className="surface p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Balance Trend</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Movement over time based on your latest records.</p>
            </div>
            <span className="rounded-full bg-slate-100/80 px-3 py-1 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">Live</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} labelStyle={{ color: '#ffffff' }} itemStyle={{ color: '#ffffff' }} />
                <Area type="monotone" dataKey="balance" stroke="#38bdf8" fill="url(#balanceGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Spending Breakdown</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Where your money is going this month.</p>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="h-[300px] w-full lg:w-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={58} outerRadius={100} paddingAngle={4}>
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between rounded-3xl bg-slate-100/80 px-4 py-3 dark:bg-slate-900/80">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{entry.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">${entry.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
