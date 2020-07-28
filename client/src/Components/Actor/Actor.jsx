import React from 'react';
import PropTypes from 'prop-types';

import NoImage from '../../assets/images/no_image.jpg';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/misc';
import { ActorStyle } from '../styles/ActorStyle';

function Actor(props) {
  let { actor, image, characterName } = props;

  if (actor) {
    return (
      <ActorStyle>
        <img
          alt={characterName}
          src={image ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage}
        />
        <span className="actor-name">{actor.name}</span>
        <span className="actor-character">{actor.character}</span>{' '}
      </ActorStyle>
    );
  }
}

Actor.propTypes = {
  actor: PropTypes.object,
};

export default Actor;
