import React from 'react';

function Vinyl(props) {
  return (
    <>
      <div className="card-title h5">{props.product.album}</div>
      <div className="card-text">{props.product.artist}</div>
    </>
  );
}

function Turntable(props) {
  return (
    <>
      <div className="card-title h5">{props.product.name} - {props.product.color}</div>
      <div className="card-text">{props.product.brand}</div>
    </>
  );
}

function Accessory(props) {
  return (
    <>
      <div className="card-title h5">{props.product.name}</div>
      <div className="card-text">{props.product.brand}</div>
    </>
  );
}

function CartSummaryItem(props) {
  const category = props.product.category === 'vinyl' ? <Vinyl product={props.product} /> : props.product.category === 'turntable' ? <Turntable product={props.product} /> : <Accessory product={props.product} />;
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="col-12 p-2 my-3 card">
      <div className="row">
        <img className="shadow-sm cart-album-art mx-4" src={props.product.albumArt} alt={props.product.album} />
        <div className="col-md-3 col-sm-12 my-auto">
          { category }
          <div className="card-subtitle text-muted my-1">{price}</div>
        </div>
        <div className="col-sm-12 col-md-2 offset-lg-2 my-auto float-right">
          <button className="btn btn-danger" onClick={() => props.deleteCartItem(props.product.cartItemId)} >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
