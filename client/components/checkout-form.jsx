import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  handleCreditCardChange(event) {
    event.preventDefault();
    this.setState({ creditCard: event.target.value });
  }

  handleAddressChange(event) {
    event.preventDefault();
    this.setState({ shippingAddress: event.target.value });
  }

  render() {
    let totalPrice = 0;
    this.props.products.forEach(product => { totalPrice += product.price; });
    totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
    return (
      <>
        <div className="row col-12">
          <h1>My Cart</h1>
        </div>
        <div className="row col-12">
          <h4 className="text-muted">Order Total: {totalPrice}</h4>
        </div>
        <form className="col-12" onSubmit={event => {
          event.preventDefault();
          this.props.placeOrder(this.state);
        }}>
          <div className="form-group">
            <label>Name</label>
            <input onChange={this.handleNameChange} className="form-control my-2" name="name" type="text" />
          </div>
          <div className="form-group">
            <label>Credit Card</label>
            <input onChange={this.handleCreditCardChange} className="form-control my-2" name="credit-card" type="text" />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <textarea onChange={this.handleAddressChange} className="form-control my-2" name="address" id="" cols="30" rows="10"></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-muted" onClick={this.props.setView} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Continue Shopping</div>
            <button className="btn btn-success" type="submit">Place Order</button>
          </div>
        </form>
      </>
    );
  }
}
