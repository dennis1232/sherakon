import React from 'react'
import StripeCheckout from 'react-stripe-checkout'



const StripeButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51I9EAvE9SIqjtQRzliawgEhUS74mSOvYcQIhDODf3R8KMnQuuVcNYihWBEpvMcVYoEty1sQUpkF2mGi7DQxxdkCG00wBJD9V9S'
   const onToken = token => {
        console.log(token)
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='SHERAKON'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}
export default StripeButton
