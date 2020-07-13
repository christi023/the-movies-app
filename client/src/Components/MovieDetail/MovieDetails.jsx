import React, { useState, useEffect } from 'react';
import { List, Avatar, Row, Col, Button } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../utils/misc';
// axios
import axios from 'axios';

// imports section components
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
//Grid Card component
import GridCards from '../Commons/GridCards';
// Main Image Component
import MainImage from '../LandingPage/Images/MainImage';

export default function MovieDetails(props) {
  const movieId = props.match.params.movieId;
  // states
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };

  // useEffect
  useEffect(() => {
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);

    axios.post('/api/comment/getComments', movieVariable).then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log('response.data.comments', response.data.comments);
        setCommentLists(response.data.comments);
      } else {
        alert('Failed to get comments Info');
      }
    });
  }, []);

  // viewing actors
  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  // fetching the detail info
  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setLoadingForMovie(false);
        // Casts endpoint results
        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            setCasts(result.cast);
          });
        // set loading for casts
        setLoadingForCasts(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  // updating comments
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>

        {/* Movie Info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}

        <br />

        {/* Actors Grid*/}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {!LoadingForCasts ? (
              Casts.map(
                (cast, index) =>
                  cast.profile_path && (
                    <GridCards actor image={cast.profile_path} characterName={cast.characterName} />
                  ),
              )
            ) : (
              <div>loading...</div>
            )}
          </Row>
        )}
        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
        </div>

        {/* Comments */}
        <Comments
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}
