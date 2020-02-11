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
      <div className="col-6 col-xl-4 mb-4">
        <div className="m-auto album-width" >
          <div className="album position-relative">
            <img className={ vinyl } src="/images/vinyl.png" alt='vinyl' />
            <img
              className="card-img-top shadow cover"
              onClick={() => this.props.setView('details', { productId: this.props.product.productId })}
              onMouseEnter={this.showVinyl}
              onMouseLeave={this.hideVinyl}
              src={this.props.product.albumArt}
              alt={this.props.product.album} />
          </div>
          <div className="card-body p-0 my-3">
            <div className="d-flex justify-content-between">
              <div className="pr-2">
                <strong className="card-title font-weight-bolder">{this.props.product.album}</strong>
                <div className="card-text font-weight-light mt-n1 mb-1">{this.props.product.artist}</div>
                <div className="card-subtitle text-muted">{price}</div>
              </div>
              <div>
                <button className="btn btn-primary" onClick={() => this.props.addToCart(this.props.product)} >Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
