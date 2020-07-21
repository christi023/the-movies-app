import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MovieThumbStyle } from '../styles/MovieThumbStyle';

const MovieThumb = ({ image, movieId, clickable }) => (
  <MovieThumbStyle>
    {clickable ? (
      <Link to={`/movie/${movieId}`}>
        <img className="clickable" src={image} alt="movieThumb" />
      </Link>
    ) : (
      <img src={image} alt="movieThumb" />
    )}
  </MovieThumbStyle>
);

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

export default MovieThumb;
