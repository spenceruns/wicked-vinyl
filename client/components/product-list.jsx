import React from 'react';
import ProductListItem from './product-list-item';

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
      <>
        {
          this.state.products.map(product => <ProductListItem key={product.productId} product={product} setView={this.props.setView} />)
        }
      </>
    );
  }
}

export default ProductList;
