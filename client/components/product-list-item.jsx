import React from 'react';

function ProductListItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  const cardSizing = { height: '48vh' };
  const imgSizing = {
    objectFit: 'contain',
    height: '30vh'
  };
  return (
    <div className="col-4">
      <div className="card shadow-sm m-3" style={ cardSizing }>
        <img className="card-img-top" src={props.product.image} alt={props.product.name} style={imgSizing} />
        <div className="card-body">
          <strong className="card-title h5">{props.product.name}</strong>
          <div className="card-subtitle text-muted my-1">{price}</div>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
