import { useEffect, useState } from 'react';
import MovieCards from '../components/MovieCards';
import { isArray } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../components/Toasts';

function WatchList() {
  const navigate = useNavigate();
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (watchlist && isArray(watchlist)) {
      setWatchlistData(watchlist);
    }
  };

  const handleRemoveMovie = (id) => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    console.log(
      '🚀 ~ file: WatchList.jsx:24 ~ handleRemoveMovie ~ watchlist:',
      watchlist
    );

    if (watchlist && isArray(watchlist)) {
      watchlist = watchlist.filter((el) => el.id !== id);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
    toastSuccess('Removed From Watchlist');
    getMovies();
  };

  return (
    <section className='container mx-auto px-4 mt-11'>
      <h1 className='mb-2 mt-0 text-5xl text-center font-medium leading-tight text-primary'>
        Your Watchlist
      </h1>
      <button
        className='rounded text-white bg-sky-700 p-4 w-3/4'
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
      <div className='mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5'>
        {watchlistData.length ? (
          watchlistData.map((el) => (
            <MovieCards
              key={el?.id}
              movieDetails={el}
              handleRemoveMovie={handleRemoveMovie}
            />
          ))
        ) : (
          <div>No Movies Added</div>
        )}
      </div>
    </section>
  );
}

export default WatchList;
