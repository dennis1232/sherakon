import React, { lazy, useEffect, Suspense } from 'react';
import { HashRouter as Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import { GlobalStyle } from './global.styles';

import Header from './components/header/header.component';
import Footer from './components/footer/footer';
import Spinner from './components/spinner/spinner.componnet';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const CheckOutPage = lazy(() => import('./pages/checkout/checkout.component'))
const Sign = lazy(() => import('./pages/sign/sign.component'))




const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])


  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner/>}>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/signin' render={() => (currentUser) ? (<Redirect to='/' />) : (<Sign />)}></Route>
          <Route exact path='/checkout' component={CheckOutPage}/>
        </Suspense>
      </Switch>
      {/* <Footer></Footer> */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App)