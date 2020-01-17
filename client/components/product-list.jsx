import React from 'react';
import ProductListItem from './product-list-item';

function ProductList(props) {
  return (
    <>
      {
        props.products.map(product => <ProductListItem key={product.productId} product={product} setView={props.setView} />)
      }
    </>
  );
}

export default ProductList;
