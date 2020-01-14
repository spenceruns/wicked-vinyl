import React from 'react';

function Loading(props) {
  return (
    <div className="progress">
      <div className="progress-bar"></div>
    </div>
  );
}

function Details(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
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
        <div className="text-muted col-2" onClick={props.setView} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
        <div className="row">
          <img className="col-6" src={props.product.image} alt={props.product.name} style={imgSizing} />
          <div className="col-6 my-auto">
            <div className="card-title h5">{props.product.name}</div>
            <div className="card-subtitle text-muted my-1">{price}</div>
            <p className="card-text">{props.product.shortDescription}</p>
          </div>
        </div>
        <div className="row">
          <div className="card-body">
            <p>{props.product.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
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
    const details = this.state.product ? <Details product={this.state.product} setView={this.props.setView} /> : <Loading />;
    return (
      <div className="col-12">
        { details }
      </div>
    );
  }
}

export default ProductDetails;
