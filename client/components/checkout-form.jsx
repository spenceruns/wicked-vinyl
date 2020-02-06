import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      creditCardNumber: '',
      month: '',
      year: '',
      cvv: '',
      terms: false,
      validation: {
        fName: true,
        lName: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zip: true,
        creditCardNumber: true,
        month: true,
        year: true,
        cvv: true,
        terms: true
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    !this.state.validation[field] && this.setState({ validation: { ...this.state.validation, [field]: true } });
    (field === 'terms')
      ? this.setState({ terms: !this.state.terms })
      : this.setState({ [field]: event.target.value });
  }

  checkForm() {
    const validation = { ...this.state.validation };
    const nameRegex = new RegExp(/^[a-zA-Z ]+$/);
    const addressRegex = new RegExp(/^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$|^\d{1,6}\040([A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,}\040[A-Z]{1}[a-z]{1,})$/);
    const cityRegex = new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
    const zipRegex = new RegExp(/^\d{5}(-\d{4})?$/);
    const creditCardRegex = new RegExp(/([0-9- ]{15,16})/);
    const cvvRegex = new RegExp(/^([0-9]{3,4})$/);
    for (const customerInfo in this.state) {
      switch (customerInfo) {
        case 'fName':
          if (!nameRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '' || this.state[customerInfo].length < 2 || this.state[customerInfo].includes('  ')) {
            validation.fName = false;
          }
          break;
        case 'lName':
          if (!nameRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '' || this.state[customerInfo].length < 2 || this.state[customerInfo].includes('  ')) {
            validation.lName = false;
          }
          break;
        case 'address1':
          if (!addressRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '') {
            validation.address1 = false;
          }
          break;
        case 'city':
          if (!cityRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '') {
            validation.city = false;
          }
          break;
        case 'state':
          if (this.state[customerInfo] === '') {
            validation.state = false;
          }
          break;
        case 'zip':
          if (!zipRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '') {
            validation.zip = false;
          }
          break;
        case 'creditCardNumber':
          if (!creditCardRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '') {
            validation.creditCardNumber = false;
          }
          break;
        case 'month':
          if (this.state[customerInfo] === '') {
            validation.month = false;
          }
          break;
        case 'year':
          if (this.state[customerInfo] === '') {
            validation.year = false;
          }
          break;
        case 'cvv':
          if (!cvvRegex.test(this.state[customerInfo]) || this.state[customerInfo] === '') {
            validation.cvv = false;
          }
          break;
        case 'terms':
          if (!this.state[customerInfo]) {
            validation.terms = false;
          }
          break;
      }
    }
    if (Object.values(validation).includes(false)) {
      this.setState({ validation: validation });

    } else {
      this.props.placeOrder(this.state);
    }
  }

  render() {
    let totalPrice = 0;
    this.props.products.forEach(product => { totalPrice += product.price; });
    totalPrice = `$${(totalPrice / 100).toFixed(2)}`;
    return (
      <>
        <div className="text-muted" onClick={() => this.props.setView('vinyl', {})} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Continue Shopping</div>
        <div className="row col-12">
          <h1>My Cart</h1>
        </div>
        <div className="row col-12">
          <h4 className="text-muted">Order Total: {totalPrice}</h4>
        </div>
        <form className="col-12" onSubmit={event => {
          event.preventDefault();
          this.checkForm();
        }}>
          <header className="h5 font-weight-bold">Shipping/Billing Information</header>
          <div className="form-row">
            <div className="form-group col-6">
              <input onChange={this.handleChange} name="fName" type="text" className={`form-control ${this.state.validation.fName ? '' : 'is-invalid'}`} maxLength="32" placeholder="First name"/>
              <div className="invalid-feedback">
                {this.state.validation.fName ? '' : 'Missing or Invalid First Name'}
              </div>
            </div>
            <div className="form-group col-6">
              <input onChange={this.handleChange} name="lName" type="text" className={`form-control ${this.state.validation.lName ? '' : 'is-invalid'}`} maxLength="32" placeholder="Last name"/>
              <div className="invalid-feedback">
                {this.state.validation.lName ? '' : 'Missing or Invalid last Name'}
              </div>
            </div>
            <div className="form-group col-12">
              <input onChange={this.handleChange} name="address1" type="text" className={`form-control ${this.state.validation.address1 ? '' : 'is-invalid'}`} maxLength="42" placeholder="Address Line 1" />
              <div className="invalid-feedback">
                {this.state.validation.address1 ? '' : 'Missing or Invalid Address'}
              </div>
            </div>
            <div className="form-group col-12">
              <input onChange={this.handleChange} name="address2" type="text" className="form-control" maxLength="42" placeholder="Address Line 2"/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input onChange={this.handleChange} name="city" type="text" className={`form-control ${this.state.validation.city ? '' : 'is-invalid'}`} maxLength="50" placeholder="City"/>
              <div className="invalid-feedback">
                {this.state.validation.city ? '' : 'Missing or Invalid City'}
              </div>
            </div>
            <div className="form-group col-md-4">
              <select onChange={this.handleChange} name="state" className={`form-control ${this.state.validation.state ? '' : 'is-invalid'}`}>
                <option defaultValue hidden>State</option>
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
              <div className="invalid-feedback">
                {this.state.validation.state ? '' : 'Missing or Invalid State'}
              </div>
            </div>
            <div className="form-group col-md-2">
              <input onChange={this.handleChange} name="zip" type="tel" className={`form-control ${this.state.validation.zip ? '' : 'is-invalid'}`} maxLength="10" placeholder="Zip Code" />
              <div className="invalid-feedback">
                {this.state.validation.zip ? '' : 'Missing or Invalid Zip Code'}
              </div>
            </div>
          </div>
          <header className="h5 font-weight-bold">Credit Card Information</header>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input onChange={this.handleChange} name="creditCardNumber" className={`form-control ${this.state.validation.creditCardNumber ? '' : 'is-invalid'}`} maxLength="16" type="tel" placeholder="Credit Card Number" />
              <div className="invalid-feedback">
                {this.state.validation.creditCardNumber ? '' : 'Missing or Invalid Credit Card'}
              </div>
            </div>
            <div className="form-group col-md-2">
              <select onChange={this.handleChange} name="month" className={`form-control ${this.state.validation.month ? '' : 'is-invalid'}`}>
                <option defaultValue hidden>Month</option>
                <option value="01">January</option>
                <option value="02">February</option>``
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
              <div className="invalid-feedback">
                {this.state.validation.month ? '' : 'Missing or Invalid Month'}
              </div>
            </div>
            <div className="form-group col-md-2">
              <select onChange={this.handleChange} name="year" className={`form-control ${this.state.validation.year ? '' : 'is-invalid'}`}>
                <option defaultValue hidden>Year</option>
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
              <div className="invalid-feedback">
                {this.state.validation.year ? '' : 'Missing or Invalid Year'}
              </div>
            </div>
            <div className="form-group col-md-2">
              <input onChange={this.handleChange} name="cvv" type="tel" className={`form-control ${this.state.validation.cvv ? '' : 'is-invalid'}`} maxLength="4" placeholder="CVV"/>
              <div className="invalid-feedback">
                {this.state.validation.cvv ? '' : 'Missing or Invalid CVV'}
              </div>
            </div>
          </div>
          <div className="form-check">
            <input onChange={this.handleChange} name="terms" type="checkbox" className={`form-check-input ${this.state.validation.terms ? '' : 'is-invalid'}`} id="gridcheck"/>
            <label htmlFor="gridCheck" className="form-check-label">
                I accept that this website is for demonstration purposes, that no payment processing will be done, and that personal information such as names, addresses, or real credit card numbers should not be used on submission of this form.
            </label>
            <div className="invalid-feedback">
              {this.state.validation.terms ? '' : 'Read and Accept the terms to continue'}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success" type="submit">Place Order</button>
          </div>
        </form>
      </>
    );
  }
}
