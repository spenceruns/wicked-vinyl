import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  checkForDetailsPage() {
    return (this.state.view.name === 'details') ? <ProductDetails productId={this.state.view.params.productId} setView={this.setView} addToCart={this.addToCart} /> : <ProductList setView={this.setView} />;
  }

  getCartItems() {
    fetch('/api/cart')
      .then(result => result.json())
      .then(data => this.setState({ cart: data }));
  }

  addToCart(product) {
    fetch(`/api/cart/${product.productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(result => result.json())
      .then(data => {
        const newList = this.state.cart;
        newList.push(data);
        this.setState({ cart: newList });
      });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="row">
          <div className="col-12 navbar navbar-dark bg-dark">
            <Header numberInCart={this.state.cart.length} />
          </div>
        </header>
        <div className="row bg-light">
          <div className="container my-3">
            <div className="row">
              { this.checkForDetailsPage() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
