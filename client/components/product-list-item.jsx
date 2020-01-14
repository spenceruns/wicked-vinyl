import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this
    );
  }

  showDetails() {
    this.props.setView('details', { productId: this.props.product.productId });
  }

  render() {
    const price = `$${(this.props.product.price / 100).toFixed(2)}`;
    const cardProps = {
      height: '48vh',
      cursor: 'pointer'
    };
    const imgSizing = {
      objectFit: 'contain',
      height: '30vh'
    };
    return (
      <div className="col-4" onClick={this.showDetails}>
        <div className="card shadow-sm m-3" style={cardProps}>
          <img className="card-img-top" src={this.props.product.image} alt={this.props.product.name} style={imgSizing} />
          <div className="card-body">
            <strong className="card-title h5">{this.props.product.name}</strong>
            <div className="card-subtitle text-muted my-1">{price}</div>
            <p className="card-text">{this.props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
