import React, { useEffect } from 'react';
import { HashRouter as Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
// import './App.css';
import { GlobalStyle } from './global.styles';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import Sign from './pages/sign/sign.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])


  return (
    <div className="App">
      <GlobalStyle/>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route exact path='/signin' render={() => (currentUser) ? (<Redirect to='/' />) : (<Sign />)}></Route>
        <Route exact path='/checkout' component={CheckOutPage} />
      </Switch>
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