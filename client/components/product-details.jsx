import React, { useState, useEffect } from 'react';
import VinylDetails from './vinyl-details';
import AccessoryDetails from './accessory-details';
import TurntableDetails from './turntable-details';

export default function ProductDetails(props) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`/api/products/${props.productId}`)
      .then(result => result.json())
      .then(data => setProduct(data));
  }, [product]);
  let details = null;
  if (product) {
    switch (product.category) {
      case 'vinyl':
        details = <VinylDetails product={product} setView={props.setView} addToCart={props.addToCart} />;
        break;
      case 'turntable':
        details = <TurntableDetails product={product} setView={props.setView} addToCart={props.addToCart} />;
        break;
      case 'accessories':
        details = <AccessoryDetails product={product} setView={props.setView} addToCart={props.addToCart} />;
        break;
      default:
        details = null;
    }
  }
  return (
    <div className="col-12">
      { details }
    </div>
  );
}
