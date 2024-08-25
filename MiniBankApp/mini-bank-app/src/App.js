import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import AccountPage from './pages/account-page';
import RequireAuth from './auth/require.auth.js';
import DashboardPage from './pages/dashboard-page.jsx';
import TransactionPage from './pages/transaction-page.jsx';
import TransferMoneyPage from './pages/transfer-money-page.jsx';
import CreateAccountPage from './pages/create-account-page.jsx';
import DepositPage from './pages/deposit-page.jsx';

function App() {

  const authPathnameProps = [
    { "path": "/accounts", "element": AccountPage },
    { "path": "/dashboard", "element": DashboardPage },
    { "path": "/transactions", "element": TransactionPage },
    { "path": "/create-account", "element": CreateAccountPage },
    { "path": "/transfer-money", "element": TransferMoneyPage },
    { "path": "/deposit", "element": DepositPage },

  ];

  return (
    <div >
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route element={<RequireAuth />}>
          {authPathnameProps.map((props, index) => (
            <Route path={props.path} element={<props.element />} key={index} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
