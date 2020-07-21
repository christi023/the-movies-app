import React from 'react';
import PropTypes from 'prop-types';

import { GridStyle, GridContentStyle } from '../styles/GridStyle';

const GridCards = ({ header, children }) => (
  <GridStyle>
    <h1>{header}</h1>
    <GridContentStyle>{children}</GridContentStyle>
  </GridStyle>
);

GridCards.propTypes = {
  header: PropTypes.string,
};

export default GridCards;
