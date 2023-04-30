import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
//import { auth, handleUserProfile } from './firebase/utils';
import { checkUserSession } from './redux/User/user.actions';
//const { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSEGING_SENDER_ID, REACT_APP_APP_ID } = process.env

//Components
import AdminToolbar from './components/adminToolbar';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';


//Layouts
import MainLayout from './layouts/mainLayout';
import HomePageLayout from './layouts/homepageLayout';
import AdminLayout from './layouts/adminLayout';

import Homepage from './pages/homepage';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import Search from './pages/search';
import ProductDetails from './pages/productDetails';
import Cart from './pages/cart';
import Order from './pages/order';


import './default.scss'


const App = props => {
  const dispatch = useDispatch();

  useEffect (() => {

    dispatch(checkUserSession());

  }, []);

    return (
      <div className="App">
        {/* <BrowserRouter> */}
        <AdminToolbar/>
        <Routes>
            <Route exact path="/" element={
              <HomePageLayout>
                <Homepage />
              </HomePageLayout>
            } />
            <Route exact path="/search" element={
              <HomePageLayout>
                <Search />
              </HomePageLayout>
            } />
            <Route path="/search/:filterType" element={
              <HomePageLayout>
                <Search />
              </HomePageLayout>
            } />
            <Route path="/product/:productID" 
            element={ (
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            )} />
            <Route path="/cart" 
            element={ (
              <MainLayout>
                <Cart />
              </MainLayout>
            )} />
            <Route path="/order" element={
              <WithAuth>
              <MainLayout>
                <Order />
              </MainLayout>
              </WithAuth>
            }/>
            <Route path="/registration" 
            element={ (
              <MainLayout>
                <Registration />
              </MainLayout>
            )} />
            <Route path="/login" 
            element={ (
              <MainLayout>
                <Login />
              </MainLayout>
            )} />
            <Route path="/recovery" element={
              <MainLayout>
                <Recovery />
              </MainLayout>
            }/>

            <Route path="/dashboard" element={
              <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
              </WithAuth>
            }/>

            <Route path="/admin" element={
              <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
              </WithAdminAuth>
            }/>
          </Routes>
      </div>
    );

}

export default App;
