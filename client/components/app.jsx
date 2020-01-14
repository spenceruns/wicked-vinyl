import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  checkForDetailsPage() {
    return (this.state.view.name === 'details') ? <ProductDetails productId={this.state.view.params.productId} setView={this.setView} /> : <ProductList setView={this.setView} />;
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="row">
          <div className="col-12 navbar navbar-dark bg-dark">
            <Header />
          </div>
        </header>
        <div className="row bg-light">
          <div className="container my-3">
            <div className="row">
              { this.checkForDetailsPage() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
