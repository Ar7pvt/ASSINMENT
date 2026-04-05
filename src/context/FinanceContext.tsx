import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction } from '../data/mockData';
import { mockTransactions } from '../data/mockData';

export type Role = 'viewer' | 'admin';

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  filters: {
    category: string;
    type: 'all' | 'income' | 'expense';
    search: string;
  };
}

interface FinanceContextType extends FinanceState {
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<FinanceState['filters']>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance-transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('finance-role');
    return (saved as Role) || 'viewer';
  });
  const [filters, setFiltersState] = useState<FinanceState['filters']>(() => {
    const saved = localStorage.getItem('finance-filters');
    return saved ? JSON.parse(saved) : {
      category: 'all',
      type: 'all',
      search: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance-role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finance-filters', JSON.stringify(filters));
  }, [filters]);

  const setFilters = (newFilters: Partial<FinanceState['filters']>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const editTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updatedTransaction } : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      filters,
      setRole,
      setFilters,
      addTransaction,
      editTransaction,
      deleteTransaction,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};