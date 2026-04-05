import { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import RoleSelector from './components/RoleSelector';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import { Sun, Moon } from 'lucide-react';

type Tab = 'dashboard' | 'transactions' | 'insights';

const navItems = [
  { key: 'dashboard', label: 'Overview' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'insights', label: 'Insights' },
];

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 shadow-sm shadow-slate-950/30 transition hover:border-cyan-400/40 hover:text-white dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-white"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <ThemeProvider>
      <FinanceProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100">
          <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[280px_1fr]">
            <aside className="border-r border-slate-800/70 bg-slate-950/95 px-6 py-8 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/95">
              <div className="mb-10 flex items-center gap-3 rounded-3xl bg-slate-900/85 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.55)] dark:bg-slate-900/85 dark:shadow-[0_20px_80px_rgba(15,23,42,0.55)]">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30">
                  F
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-400">Fintech</p>
                  <h1 className="text-xl font-semibold text-white dark:text-white">Flux</h1>
                </div>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as Tab)}
                    className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activeTab === item.key
                        ? 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-slate-950 shadow-xl shadow-fuchsia-500/20'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-900 hover:text-white dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-10 rounded-3xl bg-slate-900/80 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.6)] dark:bg-slate-900/80 dark:shadow-[0_30px_90px_rgba(15,23,42,0.6)]">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-500">Quick glance</p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-3xl bg-slate-950/80 p-4 text-sm dark:bg-slate-950/80">
                    <p className="text-slate-400 dark:text-slate-400">Spend goal</p>
                    <p className="mt-2 text-lg font-semibold text-white dark:text-white">$9,240 / $12,000</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-4 text-sm dark:bg-slate-950/80">
                    <p className="text-slate-400 dark:text-slate-400">Savings rate</p>
                    <p className="mt-2 text-lg font-semibold text-emerald-400">18.4%</p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex flex-col">
              <header className="border-b border-slate-800/70 bg-slate-950/80 px-6 py-5 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80 dark:text-cyan-300/80">Premium Finance</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl dark:text-white">Finance dashboard built for clarity.</h2>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-slate-900/20 dark:bg-slate-900/80 dark:text-slate-200">
                      Current view: <span className="font-semibold text-white dark:text-white">{activeTab}</span>
                    </div>
                    <div className="flex gap-3">
                      <ThemeToggle />
                      <RoleSelector />
                    </div>
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'transactions' && <Transactions />}
                {activeTab === 'insights' && <Insights />}
              </div>
            </main>
          </div>
        </div>
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;
