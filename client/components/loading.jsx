import React from 'react';

export default function Loading(props) {
  return (
    <div className="container-fluid mh-100 mw-100">
      <div className="row">
        <img src="./vinyl-logo.png" alt="loading-icon"/>
        <div>Loading...</div>
      </div>
    </div>
  );
}
