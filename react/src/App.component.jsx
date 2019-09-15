import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import authentication from './services/authentication';
import Navbar from './components/navbar/navbar.fun.component';
import HomePage from './pages/homePage/homePage.component';
import ShopPage from './pages/shopPage/shopPage.component';
import DepartmentPage from './pages/departmentPage/departmentPage.component';
import ProductPage from './pages/productPage/productPage.component';
import SignInPage from './pages/signInPage/signInPage.component';
import SignUpPage from './pages/signUpPage/signUpPage.component';
import CartPage from './pages/cartPage/cartPage.component';
import AccountPage from './pages/accountPage/accountPage.component';
import NotFoundPage from './pages/notFoundPage/notFoundPage.component';
import { menuItems } from './config.json';
import './App.styles.scss';

const Store = () => {
  const [auth, setAuth] = useState(false);

  useEffect(authentication.authEffect(setAuth, console.log), []);

  return (
    <React.Fragment>
      <Navbar menuItems={menuItems} auth={auth} />

      <main className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/department/:id" component={DepartmentPage} />
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/account" component={AccountPage} />
          {!auth && (
            <React.Fragment>
              <Route
                exact
                path="/sign-in"
                component={props => <SignInPage auth={auth} setAuth={setAuth} {...props} />}
              />
              <Route
                exact
                path="/sign-up"
                component={props => <SignUpPage auth={auth} setAuth={setAuth} {...props} />}
              />
            </React.Fragment>
          )}
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default Store;
