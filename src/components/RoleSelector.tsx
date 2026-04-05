import React from 'react';
import { useFinance } from '../context/FinanceContext';
import type { Role } from '../context/FinanceContext';

const RoleSelector: React.FC = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-slate-900/30 dark:border-slate-800/80 dark:bg-slate-900/80 dark:text-slate-200">
      <label htmlFor="role" className="text-slate-400 dark:text-slate-400">Role</label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className="rounded-full bg-transparent px-2 py-1 text-sm text-slate-100 outline-none dark:text-slate-100"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSelector;
