import React from 'react';
import ProductListItem from './product-list-item';

function Products(props) {
  return props.products.map(product => {
    return (
      <ProductListItem key={product.productId} product={product} />
    );
  });
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(results => results.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <Products products={this.state.products} />
    );
  }
}

export default ProductList;
