import React from 'react';

function Vinyl(props) {
  return (
    <>
      <strong className="card-title">{props.product.album}</strong>
      <div className="card-text">{props.product.artist}</div>
    </>
  );
}

function Turntable(props) {
  return (
    <>
      <strong className="card-title">{props.product.name} - {props.product.color}</strong>
      <div className="card-text">{props.product.brand}</div>
    </>
  );
}

function Accessory(props) {
  return (
    <>
      <strong className="card-title">{props.product.name}</strong>
      <div className="card-text">{props.product.brand}</div>
    </>
  );
}

export default function OrderItem(props) {
  const category = props.product.category === 'vinyl'
    ? <Vinyl product={props.product} />
    : props.product.category === 'turntable'
      ? <Turntable product={props.product} />
      : <Accessory product={props.product} />;
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="card p-2 mb-3">
      <div className="d-flex flex-column">
        <img className="shadow-sm img-fluid" src={props.product.albumArt} alt={props.product.album} />
        <div className="text-center w-100">
          <div className="mb-1">
            {category}
          </div>
          <div className="card-subtitle text-muted mb-2">{price}</div>
        </div>
      </div>
    </div>
  );
}
