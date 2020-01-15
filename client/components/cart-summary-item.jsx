import React from 'react';

function CartSummaryItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  const cardStyle = {
    height: '30vh'
  };
  const imgSizing = {
    objectFit: 'contain',
    height: '28vh'
  };
  return (
    <div className="card shadow-sm col-12 p-2 my-3" style={cardStyle}>
      <div className="row">
        <img className="col-4" src={props.product.image} alt={props.product.name} style={imgSizing} />
        <div className="col-6 my-auto">
          <div className="card-title h5">{props.product.name}</div>
          <div className="card-subtitle text-muted my-1">{price}</div>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
