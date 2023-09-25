import * as network from './network';

const getAllMovies = (params) => {
  return network.get('discover/movie', params);
};

const getMoviesOnSearch = (params) => {
  return network.get('search/movie', params);
};

const getMovieById = (id) => {
  return network.get(`movie/${id}`);
};

export default {
  getAllMovies,
  getMoviesOnSearch,
  getMovieById,
};
