import React from 'react';

export default function TurntableItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="mt-sm-4 col-sm-4 col-md-6 col-xl-4">
      <div className="album mb-5 mt-5 mb-md-3 mb-2" >
        <img className="card-img-top shadow cover" onClick={() => props.setView('details', { productId: props.product.productId })} src={props.product.albumArt} alt={props.product.name} />
        <div className="card-body p-1">
          <div className="row">
            <div className="col-12 col-md-9">
              <strong className="card-title font-weight-bolder">{props.product.name} - {props.product.color}</strong>
              <div className="card-text font-weight-light mt-n1 mb-1">{props.product.brand}</div>
              <div className="card-subtitle text-muted">{price}</div>
            </div>
            <div className="col-3 mt-1">
              <button className="btn btn-primary .d-sm-none .d-md-block" onClick={() => props.addToCart(props.product)} >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
