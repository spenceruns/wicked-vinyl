import React from 'react';
import AccessoryItem from './accessory-item';
import TurntableItem from './turntable-item';
import VinylItem from './vinyl-item';

function ProductList(props) {
  let view = null;
  if (props.view === 'accessories') {
    view = props.products.map(product => <AccessoryItem key={product.productId} product={product} setView={props.setView} addToCart={props.addToCart} />);
  } else if (props.view === 'turntable') {
    view = props.products.map(product => <TurntableItem key={product.productId} product={product} setView={props.setView} addToCart={props.addToCart} />);
  } else {
    view = props.products.map(product => <VinylItem key={product.productId} product={product} setView={props.setView} addToCart={props.addToCart} />);
  }
  return (
    <>
      { view }
    </>
  );
}

export default ProductList;
