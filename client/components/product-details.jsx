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
    return (
      <>
        <div className="text-muted" onClick={() => this.props.setView('vinyl', {})} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
        <div className="row">
          <img className="col-6 ml-4 details-album-art" src={this.props.product.albumArt} alt={this.props.product.album} />
          <div className="col-5 my-auto">
            <div className="card-title h5 font-weight-bolder">{this.props.product.album}</div>
            <div className="card-text mt-n3">{this.props.product.artist}</div>
            <div className="card-subtitle text-muted my-2">{price}</div>
            <button className="btn btn-primary" onClick={this.addToCart} >Add to Cart</button>
          </div>
        </div>
        <div className="row mt-n5">
          <div className="card-body">
            <div className="card-title"><strong>Genre: </strong>{this.props.product.genre}</div>
            <div className="card-title"><strong>Release Year: </strong>{this.props.product.releaseYear}</div>
            <p>{this.props.product.description}</p>
          </div>
        </div>
      </>
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
