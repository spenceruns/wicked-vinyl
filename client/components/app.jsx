import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
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
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
