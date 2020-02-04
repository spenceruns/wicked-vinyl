import React from 'react';

export default function TurntableItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="mt-sm-4 col-sm-4 col-md-6 col-xl-4 mb-4 mb-sm-0">
      <div className="m-auto album-width" >
        <div className="album position-relative">
          <img className="card-img-top shadow cover" onClick={() => props.setView('details', { productId: props.product.productId })} src={props.product.albumArt} alt={props.product.name} />
        </div>
        <div className="card-body p-0 my-3">
          <div className="d-flex justify-content-between">
            <div className="pr-2">
              <strong className="card-title font-weight-bolder">{props.product.name} - {props.product.color}</strong>
              <div className="card-text font-weight-light mt-n1 mb-1">{props.product.brand}</div>
              <div className="card-subtitle text-muted">{price}</div>
            </div>
            <div>
              <button className="btn btn-primary .d-sm-none .d-md-block" onClick={() => props.addToCart(props.product)} >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
