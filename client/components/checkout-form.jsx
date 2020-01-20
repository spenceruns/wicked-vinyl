import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: null,
      lName: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null,
      creditCardNumber: null,
      month: null,
      year: null,
      cvv: null
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAddress1Change = this.handleAddress1Change.bind(this);
    this.handleAddress2Change = this.handleAddress2Change.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleCreditCardNumberChange = this.handleCreditCardNumberChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleCvvChange = this.handleCvvChange.bind(this);
  }

  handleFirstNameChange(event) {
    event.preventDefault();
    this.setState({ fName: event.target.value });
  }

  handleLastNameChange(event) {
    event.preventDefault();
    this.setState({ lName: event.target.value });
  }

  handleAddress1Change(event) {
    event.preventDefault();
    this.setState({ address1: event.target.value });
  }

  handleAddress2Change(event) {
    event.preventDefault();
    this.setState({ address2: event.target.value });
  }

  handleCityChange(event) {
    event.preventDefault();
    this.setState({ city: event.target.value });
  }

  handleStateChange(event) {
    event.preventDefault();
    this.setState({ state: event.target.value });
  }

  handleZipChange(event) {
    event.preventDefault();
    this.setState({ zip: event.target.value });
  }

  handleCreditCardNumberChange(event) {
    event.preventDefault();
    this.setState({ creditCardNumber: event.target.value });
  }

  handleMonthChange(event) {
    event.preventDefault();
    this.setState({ month: event.target.value });
  }

  handleYearChange(event) {
    event.preventDefault();
    this.setState({ year: event.target.value });
  }

  handleCvvChange(event) {
    event.preventDefault();
    this.setState({ cvv: event.target.value });
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
          <header className="h5 font-weight-bold">Shipping/Billing Information</header>
          <div className="form-row">
            <div className="form-group col-6">
              <input onChange={this.handleFirstNameChange} type="text" className="form-control" placeholder="First name"></input>
            </div>
            <div className="form-group col-6">
              <input onChange={this.handleLastNameChange} type="text" className="form-control" placeholder="Last name"></input>
            </div>
            <div className="form-group col-12">
              <input onChange={this.handleAddress1Change} type="text" className="form-control" placeholder="Address Line 1" />
            </div>
            <div className="form-group col-12">
              <input onChange={this.handleAddress2Change} type="text" className="form-control" placeholder="Address Line 2" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input onChange={this.handleCityChange} type="text" className="form-control" placeholder="City"/>
            </div>
            <div className="form-group col-md-4">
              <select onChange={this.handleStateChange} name="State" className="form-control">
                <option>State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <input onChange={this.handleZipChange} type="text" className="form-control" placeholder="Zip Code" />
            </div>
          </div>
          <header className="h5 font-weight-bold">Credit Card Information</header>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input onChange={this.handleCreditCardNumberChange} className="form-control" name="credit-card" type="number" placeholder="Credit Card Number" />
            </div>
            <div className="form-group col-md-2">
              <select onChange={this.handleMonthChange} name="month" className="form-control">
                <option value="month">Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <select onChange={this.handleYearChange} name="year" className="form-control">
                <option value="year">Year</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <input onChange={this.handleCvvChange} type="number" className="form-control" placeholder="CVV"/>
            </div>
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

export default CheckoutForm;
