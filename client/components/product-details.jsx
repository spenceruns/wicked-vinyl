import React, { useState, useEffect } from 'react';
import VinylDetails from './vinyl-details';
import AccessoryDetails from './accessory-details';
import TurntableDetails from './turntable-details';

// export default class ProductDetails extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       product: null
//     };
//     this.checkForProductDetails = this.checkForProductDetails.bind(this);
//   }

//   componentDidMount() {
//     fetch(`/api/products/${this.props.productId}`)
//       .then(result => result.json())
//       .then(data => this.setState({ product: data }));
//   }

//   checkForProductDetails() {
//     if (this.state.product) {
//       switch (this.state.product.category) {
//         case 'vinyl':
//           return <VinylDetails product={this.state.product} setView={this.props.setView} addToCart={this.props.addToCart} />;
//         case 'turntable':
//           return <TurntableDetails product={this.state.product} setView={this.props.setView} addToCart={this.props.addToCart} />;
//         case 'accessories':
//           return <AccessoryDetails product={this.state.product} setView={this.props.setView} addToCart={this.props.addToCart} />;
//         default:
//           return null;
//       }
//     }
//   }

//   render() {
//     return (
//       <div className="col-12">
//         { this.checkForProductDetails() }
//       </div>
//     );
//   }
// }

export default function ProductDetails(props) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`/api/products/${props.productId}`)
      .then(result => result.json())
      .then(data => setProduct(data));
  });
  let details = null;
  if (product) {
    switch (product.category) {
      case 'vinyl':
        details = <VinylDetails product={product} setView={props.setView} addToCart={props.addToCart} />;
        break;
      case 'turntable':
        details = <TurntableDetails product={product} setView={props.setView} addToCart={props.addToCart} />;
        break;
      case 'accessories':
        details = <AccessoryDetails product={product} setView={props.setView} addToCart={props.addToCart} />;
        break;
      default:
        details = null;
    }
  }
  return (
    <div className="col-12">
      { details }
    </div>
  );
}
