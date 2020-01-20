import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'vinyl',
        params: {}
      },
      cartShowing: false,
      cart: [],
      products: []
    };
    this.setView = this.setView.bind(this);
    this.showCart = this.showCart.bind(this);
    this.hideCart = this.hideCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    }, () => this.getProducts(this.state.view.name));
  }

  showCart() {
    this.setState({ cartShowing: true });
  }

  hideCart() {
    this.setState({ cartShowing: false });
  }

  getProducts(category) {
    fetch(`/api/products/all/${category}`)
      .then(results => results.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));
  }

  checkForCurrentPage() {
    if (this.state.view.name === 'details') {
      return <ProductDetails productId={this.state.view.params.productId} setView={this.setView} addToCart={this.addToCart} />;
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm products={this.state.cart} setView={this.setView} placeOrder={this.placeOrder} />;
    } else {
      return <ProductList products={this.state.products} view={this.state.view.name} setView={this.setView} addToCart={this.addToCart} />;
    }
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

  deleteCartItem(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(() => {
        const newList = this.state.cart.filter(cartItem => cartItem.cartItemId !== cartItemId);
        this.setState({ cart: newList });
      });
  }

  placeOrder(customerInfo) {
    fetch('/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfo)
    })
      .then(data => {
        this.setState({
          view: {
            name: 'vinyl',
            params: {}
          },
          cart: []
        });
      });
  }

  componentDidMount() {
    this.getProducts('vinyl');
    this.getCartItems();
  }

  render() {
    const cart = (this.state.cartShowing) ? <CartSummary products={this.state.cart} hideCart={this.hideCart} setView={this.setView} deleteCartItem={this.deleteCartItem} /> : null;
    const pagePos = (this.state.cartShowing) ? { transform: 'translateX(-430px)', overflow: 'hidden' } : null;
    return (
      <>
        { cart }
        <div className="container-fluid bg-white shadow page" style={pagePos}>
          <header className="row sticky-top bg-light shadow-sm">
            <Header numberInCart={this.state.cart.length} setView={this.setView} showCart={this.showCart} />
          </header>
          <div className="row">
            <div className="container my-3">
              <div className="row">
                { this.checkForCurrentPage() }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
