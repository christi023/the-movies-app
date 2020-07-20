import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

export default function Favorite(props) {
  const user = useSelector((state) => state.user);

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const movieImage = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const variables = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    movieImage: movieImage,
    movieRunTime: movieRunTime,
  };

  const onClickFavorite = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert('Please Log in first');
    }

    if (Favorited) {
      //when we are already subscribed
      axios.post('/api/favorite/removeFromFavorite', variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert('Failed to Remove From Favorite');
        }
      });
    } else {
      // when we are not subscribed yet

      axios.post('/api/favorite/addToFavorite', variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Failed to Add To Favorite');
        }
      });
    }
  };

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.subscribeNumber);
      } else {
        alert('Failed to get Favorite Number');
      }
    });

    axios.post('/api/favorite/favorited', variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subscribed);
      } else {
        alert('Failed to get Favorite Information');
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button onClick={onClickFavorite}>
        {!Favorited ? 'Add to Favorite' : 'Not Favorite'} {FavoriteNumber}
      </Button>
    </>
  );
}
