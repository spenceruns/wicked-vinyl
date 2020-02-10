import React from 'react';

export default function AccessoryDetails(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <>
      <div className="text-muted" onClick={() => props.setView('accessories', {})} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
      <div className="row">
        <img className="col-5 shadow-sm p-0 m-3" src={props.product.albumArt} alt={props.product.name} />
        <div className="col-5 my-auto">
          <div className="card-title h5 font-weight-bolder">{props.product.name}</div>
          <div className="card-text mt-n3">{props.product.brand}</div>
          <div className="card-subtitle text-muted my-2">{price}</div>
          <button className="btn btn-primary" onClick={() => props.addToCart(props.product)} >Add to Cart</button>
        </div>
      </div>
      <div className="row mt-1">
        <div className="card-body">
          <p>{props.product.description}</p>
        </div>
      </div>
    </>
  );
}
