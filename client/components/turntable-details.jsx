import React from 'react';

export default function TurntableDetails(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <>
      <div className="text-muted" onClick={() => props.setView('turntable', {})} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
      <div className="row">
        <img className="col-5 ml-4 details-album-art" src={props.product.albumArt} alt={props.product.name} />
        <div className="col-5 my-auto">
          <div className="card-title h5 font-weight-bolder">{props.product.name} - {props.product.color}</div>
          <div className="card-text mt-n3">{props.product.brand}</div>
          <div className="card-subtitle text-muted my-2">{price}</div>
          <button className="btn btn-primary" onClick={() => props.addToCart(props.product)} >Add to Cart</button>
        </div>
      </div>
      <div className="row mt-n5">
        <div className="card-body">
          <p>{props.product.description}</p>
        </div>
      </div>
    </>
  );
}
