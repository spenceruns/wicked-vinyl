import React from 'react';

function Loading(props) {
  return (
    <div className="progress">
      <div className="progress-bar"></div>
    </div>
  );
}

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
      <div className="card shadow-sm m-3 p-4" style={cardStyle} >
        <div className="row">
          <div className="text-muted col-2" onClick={this.props.setView} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
          <div className="row">
            <img className="col-6" src={this.props.product.image} alt={this.props.product.name} style={imgSizing} />
            <div className="col-6 my-auto">
              <div className="card-title h5">{this.props.product.name}</div>
              <div className="card-subtitle text-muted my-1">{price}</div>
              <p className="card-text">{this.props.product.shortDescription}</p>
              <button className="btn btn-primary" onClick={this.addToCart} >Add to Cart</button>
            </div>
          </div>
          <div className="row">
            <div className="card-body">
              <p>{this.props.product.longDescription}</p>
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
    const details = this.state.product ? <Details product={this.state.product} setView={this.props.setView} addToCart={this.props.addToCart} /> : <Loading />;
    return (
      <div className="col-12">
        { details }
      </div>
    );
  }
}

export default ProductDetails;
