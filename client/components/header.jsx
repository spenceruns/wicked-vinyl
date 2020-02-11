import React from 'react';

export default function Header(props) {
  const itemCount = (props.numberInCart === 1) ? 'Item' : 'Items';
  return (
    <nav className="container d-flex justify-content-between navbar">
      <div className="navbar-brand" onClick={() => {
        props.setView('vinyl', {});
        props.view === 'confirmation' && props.resetCart();
      }} style={{ cursor: 'pointer' }}><strong>Wicked</strong><img className="logo mx-1" src="/images/vinyl-logo.png" alt="logo" /><strong>Vinyl</strong></div>
      <div className="navbar-nav text-right">
        <div onClick={() => props.setView('vinyl', {})} className={`nav-item ${props.view === 'vinyl' && 'font-weight-bold'}`}>Vinyl</div>
        <div onClick={() => props.setView('turntable', {})} className={`nav-item ${props.view === 'turntable' && 'font-weight-bold'}`}>Turntables</div>
        <div onClick={() => props.setView('accessories', {})} className={`nav-item ${props.view === 'accessories' && 'font-weight-bold'}`}>Accessories</div>
        <div onClick={props.view !== 'confirmation' ? props.toggleCart : undefined} className="nav-item" >{props.numberInCart} {itemCount}<i className='fa fa-shopping-cart ml-2'></i></div>
      </div>
    </nav>
  );
}
