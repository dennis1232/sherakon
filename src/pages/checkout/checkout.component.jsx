
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from './../../redux/cart/cart.selectors';
import './checkout.style.scss';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from './../../components/stripe-button/stripe-button.component';
const CheckOutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =><CheckOutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className="total">Total:${total}</div>
        <div className="test-warning">
            *please use the following test credit card for payments*
            <br/>
            4242 4242 4242 4242 -Exp:01/22 -CVV 123
        </div>
        <StripeButton price={total}></StripeButton>
    </div>
)
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(mapStateToProps)(CheckOutPage);