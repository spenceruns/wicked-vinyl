import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    this.props.addToCart(this.props.product);
  }

  render() {
    const price = `$${(this.props.product.price / 100).toFixed(2)}`;
    const cardStyle = {
      height: '87vh'
    };
    const imgSizing = {
      objectFit: 'contain',
      height: '60vh'
    };
    return (
      <div className="p-4" style={cardStyle} >
        <div className="row">
          <div className="text-muted col-2" onClick={this.props.setView} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
          <div className="row">
            <img className="col-6 ml-4" src={this.props.product.albumArt} alt={this.props.product.album} style={imgSizing} />
            <div className="col-5 my-auto">
              <div className="card-title h5 font-weight-bolder">{this.props.product.album}</div>
              <p className="card-text mt-n1">{this.props.product.artist}</p>
              <div className="card-subtitle text-muted">{price}</div>
              <button className="btn btn-primary" onClick={this.addToCart} >Add to Cart</button>
            </div>
          </div>
          <div className="row">
            <div className="card-body">
              <p>{this.props.product.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(result => result.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    const details = this.state.product ? <Details product={this.state.product} setView={this.props.setView} addToCart={this.props.addToCart} /> : null;
    return (
      <div className="col-12">
        { details }
      </div>
    );
  }
}

export default ProductDetails;
