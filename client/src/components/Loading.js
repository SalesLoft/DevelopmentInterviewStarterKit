import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Loading.css';
import loadingGif from '../../public/loading.gif';

export default class Loading extends Component {
  render() {
    return (
      <div className='loading-more'>
        <img
          width='50'
          height='50'
          src={loadingGif}
          alt='Loading page'
        />
      </div>
    );
  }
}
