import React from 'react';
import OrderItem from './order-item';

export default function ConfirmationPage(props) {
  let totalPrice = 0;
  props.cart.forEach(product => { totalPrice += product.price * product.quantity; });
  totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
  let date = new Date();
  date = Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
  const address2 = props.info.address2 ? props.info.address2 : '';
  const creditCardNumber = props.info.creditCardNumber.substr(-4);
  return (
    <div className="container">
      <div className="row mb-4">
        <header className="background rounded-lg">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center text-white">
                <h1 className="font-weight-light">Thank you for your order!</h1>
                <p className="lead">Get ready to rock</p>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="col-7 border">
          <h4 className="font-weight-bolder text-center my-3">Total: {totalPrice}</h4>
          {props.cart.map(product => <OrderItem
            key={product.cartItemId}
            product={product} />)}
        </div>
        <div className="col-4 h-100">
          <div className="border p-3 mb-3">
            <div className="text-muted">Order Number: {props.info.orderId}</div>
            <div className="text-muted">Order Date: {date}</div>
            <h3 className="font-weight-bolder">Address</h3>
            <div>{props.info.fName} {props.info.lName}</div>
            <div>{props.info.address1}</div>
            <div>{address2}</div>
            <div>{props.info.city}, {props.info.state} {props.info.zip}</div>
            <h3 className="font-weight-bolder">Payment Method</h3>
            <div>Credit Card: &#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;{creditCardNumber}</div>
            <div>Exp Date: {props.info.month}/{props.info.year}</div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={() => {
              props.setView('vinyl', {});
              props.resetCart();
            }}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}
