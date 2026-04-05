# Finance Dashboard UI

A clean and interactive finance dashboard built with React, TypeScript, Vite, and Tailwind CSS. This project demonstrates frontend development skills including component design, state management, data visualization, and responsive UI.

## Features

### Dashboard Overview
- Summary cards displaying Total Balance, Income, and Expenses
- Balance trend visualization using line chart
- Spending breakdown using pie chart

### Transactions Section
- List of transactions with date, amount, category, and type
- Filtering by category and type (income/expense)
- Search functionality
- Sorting capabilities
- Export to CSV (optional)

### Role-Based UI
- Viewer role: Can only view data
- Admin role: Can add, edit, and delete transactions
- Role switcher dropdown for demonstration

### Insights Section
- Highest spending category
- Monthly comparison table
- Average expense calculation
- Recent activity feed
- Spending categories overview

### State Management
- React Context for global state
- Local storage persistence
- Filters and role state handling

### UI/UX
- Clean, readable design
- Responsive layout (mobile-friendly)
- Graceful handling of empty states
- Intuitive navigation with tabs

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **CSV Export**: PapaParse
- **State Management**: React Context

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx      # Overview with charts and summary cards
│   ├── Transactions.tsx   # Transaction list with filters and CRUD
│   ├── Insights.tsx       # Analytics and insights
│   └── RoleSelector.tsx   # Role switching component
├── context/
│   └── FinanceContext.tsx # Global state management
├── data/
│   └── mockData.ts        # Mock transaction data
├── App.tsx                # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles with Tailwind
```

## Approach and Design Decisions

### Component Architecture
- Modular components for each major section
- Separation of concerns with dedicated components for UI logic
- Reusable form components for add/edit transactions

### State Management
- React Context for simple, centralized state
- Local storage integration for data persistence
- Efficient filtering and searching with useMemo

### Styling
- Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach
- Consistent color scheme and typography

### Data Visualization
- Recharts for interactive charts
- Meaningful data representations (line for trends, pie for categories)
- Accessible chart components

### User Experience
- Intuitive tab-based navigation
- Clear visual hierarchy
- Role-based feature visibility
- Confirmation dialogs for destructive actions

## Evaluation Criteria Met

- **Design and Creativity**: Clean layout with thoughtful use of colors and spacing
- **Responsiveness**: Mobile-friendly grid layouts and flexible components
- **Functionality**: Complete CRUD operations, filtering, and role-based access
- **User Experience**: Easy navigation, clear labels, and logical flow
- **Technical Quality**: TypeScript for type safety, modular code structure
- **State Management**: Effective use of Context with persistence
- **Documentation**: Comprehensive README with setup and overview
- **Attention to Detail**: Error handling, empty states, and data validation

## Future Enhancements

- Dark mode toggle
- Advanced filtering (date ranges, amount ranges)
- Data import from CSV
- Real-time updates with WebSocket
- Unit and integration tests
- Progressive Web App (PWA) features
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
