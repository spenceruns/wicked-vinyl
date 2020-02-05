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
      showCart: false,
      movePage: false,
      cart: [],
      products: []
    };
    this.setView = this.setView.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
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

  toggleCart() {
    if (this.state.showCart) {
      this.setState({ movePage: false });
      setTimeout(() => {
        this.setState({ showCart: false });
      }, 300);
    } else {
      this.setState({
        movePage: true,
        showCart: true
      });
    }
  }

  getProducts(category) {
    fetch(`/api/products/all/${category}`)
      .then(results => results.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));
  }

  checkForCurrentPage() {
    switch (this.state.view.name) {
      case 'details':
        return <ProductDetails productId={this.state.view.params.productId} setView={this.setView} addToCart={this.addToCart} />;
      case 'checkout':
        return <CheckoutForm products={this.state.cart} setView={this.setView} placeOrder={this.placeOrder} />;
      default:
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
        const index = newList.findIndex(item => item.productId === data.productId);
        ~index ? newList[index] = data : newList.push(data);
        this.setState({ cart: newList });
        this.toggleCart();
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
        }, () => this.getProducts('vinyl'));
      });
  }

  componentDidMount() {
    this.getProducts('vinyl');
    this.getCartItems();
  }

  render() {
    const cart = this.state.showCart && <CartSummary products={this.state.cart} toggleCart={this.toggleCart} setView={this.setView} deleteCartItem={this.deleteCartItem} />;
    let quantity = 0;
    this.state.cart.forEach(item => {
      quantity += item.quantity;
    });
    return (
      <>
        { cart }
        <div className={`container-fluid page ${this.state.showCart && 'background-white'} ${this.state.movePage && 'cart-shown'}`}>
          <div className={`cover-shadow ${!this.state.showCart && 'cover-shadow-hidden'}`} onClick={this.toggleCart}></div>
          <header className="row sticky-top bg-light shadow-sm">
            <Header numberInCart={quantity} setView={this.setView} toggleCart={this.toggleCart} />
          </header>
          <div className="row">
            <div className="container full-page my-3">
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
