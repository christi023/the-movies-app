import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row } from 'antd';
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

const { Title } = Typography;

function LandingPage() {
  const buttonRef = useRef(null);
  // All data
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);
  //const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  // search movies
  const searchMovies = (search) => {
    const endpoint1 = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
    //setSearchTerm(search);
    fetchMovies(endpoint1);
  };

  // method to fetch movies to reload pages
  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result)
        // console.log('Movies',...Movies)
        // console.log('result',...result.results)
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page);
      }, setLoading(false))
      .catch((error) => console.error('Error:', error));
  };

  // load more items on page
  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);
    console.log('CurrentPage', CurrentPage);
    // loading diff pages
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint);
  };

  // scroll
  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      // loadMoreItems()
      console.log('clicked');
      buttonRef.current.click();
    }
  };

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

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <Title level={2}> Movies by latest </Title>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>

        {Loading && <div>Loading...</div>}

        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
