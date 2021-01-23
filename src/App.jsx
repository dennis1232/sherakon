import React, { Component } from 'react';
import { HashRouter as Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import Sign from './pages/sign/sign.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
class App extends Component {
  unsubscribeFromAuth = null
  componentDidMount() {
    const {checkUserSession} =this.props
    checkUserSession()
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth = null
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/signin' render={() => (this.props.currentUser) ? (<Redirect to='/' />) : (<Sign />)}></Route>
          <Route exact path='/checkout' component={CheckOutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps =dispatch=>({
  checkUserSession: ()=>dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps)(App)