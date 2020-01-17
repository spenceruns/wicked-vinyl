import React from 'react';

function CartSummaryItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="col-12 p-2 my-3 card">
      <div className="row">
        <img className="shadow-sm cart-album-art mx-4" src={props.product.albumArt} alt={props.product.album} />
        <div className="col-md-3 col-sm-12 my-auto">
          <div className="card-title h5">{props.product.album}</div>
          <div className="card-text">{props.product.artist}</div>
          <div className="card-subtitle text-muted my-1">{price}</div>
        </div>
        <div className="col-sm-12 col-md-2 offset-lg-2 offset-xl-3 my-auto float-right">
          <button className="btn btn-danger" onClick={() => props.deleteCartItem(props.product.cartItemId)} >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
