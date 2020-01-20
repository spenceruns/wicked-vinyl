import React from 'react';

function Header(props) {
  const itemCount = (props.numberInCart === 1) ? 'Item' : 'Items';
  return (
    <nav className="container d-flex justify-content-between navbar">
      <div className="navbar-brand" onClick={() => props.setView('vinyl', {})} style={{ cursor: 'pointer' }}><strong>Wicked</strong><img className="logo mx-1" src="/images/vinyl-logo.png" alt="logo" /><strong>Vinyl</strong></div>
      <div className="navbar-nav text-right">
        <div onClick={() => props.setView('vinyl', {})} className="nav-item">Vinyl</div>
        <div onClick={() => props.setView('turntable', {})} className="nav-item">Turntables</div>
        <div onClick={() => props.setView('accessories', {})} className="nav-item">Accessories</div>
        <div onClick={() => props.setView('cart', {})} className="nav-item" >{props.numberInCart} {itemCount}<i className='fa fa-shopping-cart ml-2'></i></div>
      </div>
    </nav>
  );
}

export default Header;
