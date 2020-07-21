import React from 'react';
import PropTypes from 'prop-types';

import { LoadMoreBtnStyle } from '../styles/LoadMoreBtnStyle';

const LoadMoreBtn = ({ text, callback }) => (
  <LoadMoreBtnStyle type="button" onClick={callback}>
    {text}
  </LoadMoreBtnStyle>
);

LoadMoreBtn.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func,
};

export default LoadMoreBtn;
