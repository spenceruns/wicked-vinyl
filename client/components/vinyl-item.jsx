import React, { useState } from 'react';

export default function VinylItem(props) {
  const [hover, setHover] = useState(false);

  const price = `$${(props.product.price / 100).toFixed(2)}`;
  const vinyl = hover ? 'card-img-top vinyl show-vinyl' : 'card-img-top vinyl';

  return (
    <div className="col-6 col-xl-4 mb-4">
      <div className="m-auto album-width" >
        <div className="album position-relative">
          <img className={vinyl} src="/images/vinyl.png" alt='vinyl' />
          <img
            className="card-img-top shadow cover"
            onClick={() => props.setView('details', { productId: props.product.productId })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            src={props.product.albumArt}
            alt={props.product.album} />
        </div>
        <div className="card-body p-0 my-3">
          <div className="d-flex justify-content-between">
            <div className="pr-2">
              <strong className="card-title font-weight-bolder">{props.product.album}</strong>
              <div className="card-text font-weight-light mt-n1 mb-1">{props.product.artist}</div>
              <div className="card-subtitle text-muted">{price}</div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={() => props.addToCart(props.product)}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
