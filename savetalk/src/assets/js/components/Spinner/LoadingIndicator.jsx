import React from 'react';
import { hot } from 'react-hot-loader';


const LoadingIndicator = () => (
  <div className="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default hot(module)(LoadingIndicator);