import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = (props.products.length > 0) ? props.products.map(product => <CartSummaryItem key={product.cartItemId} product={product} deleteCartItem={props.deleteCartItem} />) : <div className="h1 text-center">No Items in Cart</div>;
  const button = ((props.products.length > 0)) ? <button onClick={() => { props.setView('checkout', {}); }} className="btn btn-dark">Checkout</button> : null;
  let totalPrice = 0;
  props.products.forEach(product => { totalPrice += product.price; });
  totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
  return (
    <div className="cart container col-md-5 col-lg-4 col-xl-3">
      <div className="d-flex justify-content-between">
        <div>
          <div className="text-muted" onClick={props.hideCart} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
          <h1>Cart</h1>
        </div>
      </div>
      { cartItems }
      <div className="sticky-bottom">
        <h4 className="text-muted text-center mt-2">Total: {totalPrice}</h4>
        {button}
      </div>
    </div>
  );
}

export default CartSummary;
