//SERVER ROUTES
export const USER_SERVER = '/api/users';

export const API_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = 'c12f15df0469c213fe44866c12783311';

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
export const BACKDROP_SIZE = 'w1280';
export const IMAGE_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE = 'w500';
export const backdrop_path = '/';

export const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
export const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
