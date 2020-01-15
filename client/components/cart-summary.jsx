import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = (props.products.length > 1) ? props.products.map(product => <CartSummaryItem key={product.cartItemId} product={product} />) : <div className="display-2 text-center">No Items in Cart</div>;
  let totalPrice = 0;
  props.products.forEach(product => { totalPrice += product.price; });
  totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div>
          <div className="text-muted" onClick={() => props.setView('catalog', {})} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
          <h1>My Cart</h1>
        </div>
        <h4 className="text-muted my-auto">Total: { totalPrice }</h4>
      </div>
      { cartItems }
    </div>
  );
}

export default CartSummary;
