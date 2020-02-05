import React from 'react';

function Vinyl(props) {
  return (
    <>
      <strong className="card-title">{props.product.album}</strong>
    </>
  );
}

function Turntable(props) {
  return (
    <>
      <strong className="card-title">{props.product.name} - {props.product.color}</strong>
    </>
  );
}

function Accessory(props) {
  return (
    <>
      <strong className="card-title">{props.product.name}</strong>
    </>
  );
}

export default function CartSummaryItem(props) {
  const category = props.product.category === 'vinyl'
    ? <Vinyl product={props.product} />
    : props.product.category === 'turntable'
      ? <Turntable product={props.product} />
      : <Accessory product={props.product} />;
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="card p-2 mb-3">
      <div className="d-flex align-start">
        <img className="shadow-sm cart-album-art mr-2 my-auto" src={props.product.albumArt} alt={props.product.album} />
        <div className="text-left w-100">
          <div className="mb-1">
            {category}
          </div>
          <div className="card-subtitle text-muted mb-2">{price}</div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger my-auto" onClick={() => props.deleteCartItem(props.product.cartItemId)} >Delete</button>
            <div className="number">{props.product.quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
