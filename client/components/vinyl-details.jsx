import React from 'react';

export default function VinylDetails(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <>
      <div className="text-muted" onClick={() => props.setView('vinyl', {})} style={{ cursor: 'pointer' }} ><i className="fa fa-angle-left"></i> Back to catalog</div>
      <div className="row">
        <img className="col-5 ml-4 details-album-art" src={props.product.albumArt} alt={props.product.album} />
        <div className="col-5 my-auto">
          <div className="card-title h5 font-weight-bolder">{props.product.album}</div>
          <div className="card-text mt-n3">{props.product.artist}</div>
          <div className="card-subtitle text-muted my-2">{price}</div>
          <button className="btn btn-primary" onClick={() => props.addToCart(props.product)} >Add to Cart</button>
        </div>
      </div>
      <div className="row mt-n5">
        <div className="card-body">
          <div className="card-title"><strong>Genre: </strong>{props.product.genre}</div>
          <div className="card-title"><strong>Release Year: </strong>{props.product.releaseYear}</div>
          <p>{props.product.description}</p>
        </div>
      </div>
    </>
  );
}
