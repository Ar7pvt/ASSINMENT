import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import type { Transaction } from '../data/mockData';
import { categories } from '../data/mockData';
import { Search, Plus, Edit, Trash2, Download } from 'lucide-react';
import Papa from 'papaparse';

const Transactions: React.FC = () => {
  const { transactions, role, filters, setFilters, addTransaction, editTransaction, deleteTransaction } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesCategory = filters.category === 'all' || t.category === filters.category;
      const matchesType = filters.type === 'all' || t.type === filters.type;
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = t.description?.toLowerCase().includes(searchTerm) || t.category.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [transactions, filters]);

  const handleAdd = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleFormSubmit = (transaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, transaction);
    } else {
      addTransaction(transaction);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <section className="surface p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Transactions</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Filter, export, and manage all activity from one place.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const csv = Papa.unparse(filteredTransactions);
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'transactions.csv';
                link.click();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            {role === 'admin' && (
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
              >
                <Plus className="h-4 w-4" />
                Add transaction
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-100/80 p-4 dark:bg-slate-900/80">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Filter by category</p>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ category: e.target.value })}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl bg-slate-100/80 p-4 dark:bg-slate-900/80">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Filter by type</p>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ type: e.target.value as any })}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="rounded-3xl bg-slate-100/80 p-4 dark:bg-slate-900/80">
            <label className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Search</label>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-slate-500 dark:text-slate-500" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder="Search transactions"
                className="w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-2 pl-11 text-slate-900 placeholder:text-slate-500 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100/95 text-slate-600 dark:bg-slate-900/95 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 hidden md:table-cell">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                {role === 'admin' && <th className="px-6 py-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-t border-slate-200 bg-white/95 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/95 dark:hover:bg-slate-900/80">
                  <td className="px-6 py-4 text-slate-900 dark:text-slate-300">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 hidden md:table-cell dark:text-slate-300">{t.description || '-'}</td>
                  <td className="px-6 py-4">{t.category}</td>
                  <td className="px-6 py-4 capitalize">{t.type}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${t.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${Math.abs(t.amount).toFixed(2)}
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEdit(t)} className="rounded-full p-2 text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="rounded-full p-2 text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">No transactions found.</div>
        )}
      </section>

      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

interface TransactionFormProps {
  transaction: Transaction | null;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    date: transaction?.date || new Date().toISOString().split('T')[0],
    amount: transaction?.amount || 0,
    category: transaction?.category || categories[0],
    type: transaction?.type || 'expense',
    description: transaction?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 dark:bg-black/60">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl shadow-black/40 dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{transaction ? 'Edit' : 'Add'} transaction</h3>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Cancel</button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Date</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Amount</span>
              <input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <span>Category</span>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-2 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Type</span>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Description</span>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              {transaction ? 'Update' : 'Add'} Transaction
            </button>
            <button type="button" onClick={onCancel} className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transactions;
