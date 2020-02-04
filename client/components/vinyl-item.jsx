import React from 'react';

export default class VinylItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
    this.showVinyl = this.showVinyl.bind(this);
    this.hideVinyl = this.hideVinyl.bind(this);
  }

  showVinyl() {
    this.setState({ isHovered: true });
  }

  hideVinyl() {
    this.setState({ isHovered: false });
  }

  render() {
    const price = `$${(this.props.product.price / 100).toFixed(2)}`;
    const vinyl = this.state.isHovered ? 'card-img-top vinyl show-vinyl' : 'card-img-top vinyl';
    return (
      <div className="mt-sm-4 col-sm-4 col-md-6 col-xl-4">
        <div className="album mb-5 mt-5 mb-md-3" >
          <img className={ vinyl } src="/images/vinyl.png" alt='vinyl' />
          <img
            className="card-img-top shadow cover"
            onClick={() => this.props.setView('details', { productId: this.props.product.productId })}
            onMouseEnter={this.showVinyl}
            onMouseLeave={this.hideVinyl}
            src={this.props.product.albumArt}
            alt={this.props.product.album} />
          <div className="card-body p-1">
            <div className="row">
              <div className="col-12 col-md-9">
                <strong className="card-title font-weight-bolder">{this.props.product.album}</strong>
                <div className="card-text font-weight-light mt-n1 mb-1">{this.props.product.artist}</div>
                <div className="card-subtitle text-muted">{price}</div>
              </div>
              <div className="col-3 mt-1">
                <button className="btn btn-primary d-sm-none" onClick={() => this.props.addToCart(this.props.product)} >Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
