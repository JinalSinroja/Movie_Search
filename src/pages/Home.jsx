import { useEffect, useState } from 'react';
import MovieCards from '../components/MovieCards';
import { debounce } from 'lodash';
import service from '../api/index';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (!searchValue || searchValue === '') getAllData();
    else getOnSearch();
  }, [currentPage]);

  useEffect(() => {
    if (searchValue == '') {
      getAllData();
      return;
    }
    if (searchValue) getOnSearch();
  }, [searchValue]);

  const getAllData = () => {
    service
      .getAllMovies({ page: currentPage })
      .then((response) => {
        setMovieData(response?.data?.results);
        setFilteredMovies(response?.data?.results);
        setCurrentPage(response?.data?.page);
        setTotalPage(response?.data?.total_pages);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getOnSearch = (value) => {
    if (value == '') {
      getAllData();
      return;
    }

    const params = {
      query: searchValue,
      page: currentPage,
    };
    service
      .getMoviesOnSearch(params)
      .then((response) => {
        setFilteredMovies(response?.data?.results);
        setCurrentPage(response?.data?.page);
        setTotalPage(response?.data?.total_pages);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const onSearchDebounce = debounce(onSearch, 1000);

  const onSearchChange = (value) => {
    onSearchDebounce(value);
  };

  const handleNextClick = () => {
    if (totalPage > currentPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className='mb-5'>
      <div className='container mx-auto px-4'>
        <h1 className='mb-2 text-5xl text-center font-medium leading-tight text-primary'>
          Movie Searcher
        </h1>
        <div className='mb-3 flex justify-center'>
          <div className='mt-5 flex w-[80%]'>
            <input
              type='search'
              className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.8rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
              id='exampleSearch'
              placeholder='Type Movie Name'
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              className='rounded ml-4 w-40 text-white bg-sky-700 p-4 w-3/4'
              onClick={() => navigate('/watchlist')}
            >
              See Watchlist
            </button>
          </div>
        </div>
        {filteredMovies.length ? (
          <div className='mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5'>
            {filteredMovies.map((el) => (
              <MovieCards key={el?.id} movieDetails={el} />
            ))}
          </div>
        ) : (
          <div className='font-bold text-3xl text-center'>No Movies Found</div>
        )}
        {filteredMovies.length ? (
          <div className='flex justify-end rounded-lg p-3 mt-5'>
            {currentPage !== 1 && (
              <button
                className='mx-2 w-[3rem] rounded-[2rem] bg-sky-700 p-2 font-black hover:bg-primary hover:text-white'
                onClick={handlePrevClick}
              >
                {'<'}
              </button>
            )}
            <h5 className='mt-2 font-bold'>
              {currentPage} <span className='font-light'>of</span> {totalPage}
            </h5>
            <button
              className='mx-2 w-[3rem] rounded-[2rem] bg-sky-700 p-2 font-black hover:bg-primary hover:text-white'
              onClick={handleNextClick}
            >
              {'>'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Home;
