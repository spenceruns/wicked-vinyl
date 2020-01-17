import React from 'react';

function CartSummaryItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="col-12 p-2 my-3">
      <div className="row">
        <img className="shadow-sm cart-album-art mr-4" src={props.product.albumArt} alt={props.product.album} />
        <div className="col-6 my-auto">
          <div className="card-title h5">{props.product.album}</div>
          <div className="card-text">{props.product.artist}</div>
          <div className="card-subtitle text-muted my-1">{price}</div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
