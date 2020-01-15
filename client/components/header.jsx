import React from 'react';

function Header(props) {
  return (
    <div className="container d-flex justify-content-between text-white">
      <div className="navbar-brand"><i className="fa fa-dollar-sign mr-2"></i><strong>Wicked Sales</strong></div>
      <div>{props.numberInCart}<i className='fa fa-shopping-cart ml-2'></i></div>
    </div>
  );
}

export default Header;
