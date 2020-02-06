import React from 'react';
import OrderItem from './order-item';

export default function ConfirmationPage(props) {
  let totalPrice = 0;
  props.cart.forEach(product => { totalPrice += product.price; });
  totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
  return (
    <div className="container">
      <div className="row mb-4">
        <header className="background rounded-lg">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center text-white">
                <h1 className="font-weight-light">Thank you for your order!</h1>
                <p className="lead">Your order number is 3</p>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="col-5 border">
          <h4 className="font-weight-bolder text-center my-3">Total: {totalPrice}</h4>
          {props.cart.map(product => <OrderItem
            key={product.cartItemId}
            product={product} />)}
        </div>
        <div className="col-6 border">
          <h2 className="font-weight-bolder">Address</h2>
          <div>Spencer Allen</div>
          <div>1 Infinite Loop</div>
          <div>PleasingVille, CA 99999</div>
        </div>
      </div>
    </div>
  );
}
