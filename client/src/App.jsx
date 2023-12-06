import './App.css'
import axios from 'axios';

import { UserContextProvider } from './context/UserContext';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';

import IndexPartnerPage from './pages/IndexPartnerPage';
import IndexAdminPage from './pages/IndexAdminPage';

import IndexPage from "./pages/IndexPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/account/AccountPage';
import SearchPage from './pages/search/SearchPage';
import ProductPage from './pages/product/ProductPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        {/* <Route path="/IndexPartnerPage" element={<IndexPartnerPage />}>
          
        </Route>
        <Route path="/IndexAdminPage" element={<IndexAdminPage />}>
          
        </Route> */}
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
