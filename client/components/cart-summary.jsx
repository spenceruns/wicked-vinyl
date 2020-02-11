import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cartItems = (props.products.length > 0)
    ? props.products.map(product => <CartSummaryItem
      key={product.cartItemId}
      product={product}
      addToCart={props.addToCart}
      decreaseItemQuantity={props.decreaseItemQuantity}
      deleteCartItem={props.deleteCartItem} />)
    : <div className="h1 text-center">No Items in Cart</div>;
  const button = ((props.products.length > 0)) && <button onClick={() => {
    props.setView('checkout', {});
    props.toggleCart();
  }} className="btn btn-dark">Checkout</button>;
  let totalPrice = 0;
  props.products.forEach(product => { totalPrice += product.price * product.quantity; });
  totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
  return (
    <div className="cart container">
      <div className="d-flex justify-content-between">
        <div>
          <div className="text-muted" onClick={props.toggleCart} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Close Cart</div>
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
