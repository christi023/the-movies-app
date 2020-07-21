import React, { useState, useEffect } from 'react';
// import utils
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
} from '../utils/misc';

// Components
import MainImage from './Images/MainImage';
import GridCard from '../Commons/GridCards';
import SearchBar from '../SearchBar/SearchBar';
import MovieThumb from '../MovieThumb/MovieThumb';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Spinner from '../Spinner/Spinner';
import NoImage from '../../assets/images/no_image.jpg';

function LandingPage() {
  //const buttonRef = useRef();
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch popular movies initially on mount
  useEffect(() => {
    if (sessionStorage.homeState) {
      setMovies(JSON.parse(sessionStorage.homeState));
      setLoading(false);
    } else {
      fetchMovies(POPULAR_BASE_URL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Movies.searchTerm) {
      sessionStorage.setItem('homeState', JSON.stringify(Movies));
    }
  }, [Movies]);

  // search movies
  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  // fetch movies method
  const fetchMovies = (endpoint) => {
    const isLoadMore = endpoint.search('page');
    setError(false);
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result)
        // console.log('Movies',...Movies)
        // console.log('result',...result.results)
        setMovies(isLoadMore !== -1 ? [...Movies, ...result.results] : [...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page);
        setTotalPages(result.total_pages);
      }, setLoading(false))
      .catch((error) => console.error('Error:', error));
  };

  const loadMoreItems = () => {
    const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${CurrentPage + 1}`;
    const popularEndpoint = `${POPULAR_BASE_URL}&page=${CurrentPage + 1}`;

    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;

    fetchMovies(endpoint);
  };

  if (error) return <div>Something went wrong ...</div>;
  if (!Movies[0]) return <Spinner />;

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <SearchBar callback={searchMovies} />

      <div style={{ width: '95%', margin: '1rem auto' }}>
        <GridCard header={searchTerm ? 'Search Result' : 'Popular Movies'}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <MovieThumb
                  key={movie.id}
                  clickable
                  image={
                    movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </GridCard>

        {Loading && <Spinner />}

        {CurrentPage < totalPages && !Loading && (
          <LoadMoreBtn text="Load More" callback={loadMoreItems} />
        )}
        <br />
      </div>
    </div>
  );
}

export default LandingPage;
