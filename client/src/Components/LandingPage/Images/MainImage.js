import React from 'react';
import PropTypes from 'prop-types';

import { MainImageStyle } from '../../styles/MainImageStyle';

const MainImage = ({ image, title, text }) => (
  <MainImageStyle image={image}>
    <div className="mainImage-content">
      <div className="mainImage-text">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  </MainImageStyle>
);

MainImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default MainImage;
