import { isArray } from 'lodash';
import { IMAGE_PATH } from '../utils/constants';
import { toastInformation, toastSuccess } from './Toasts';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieCards = ({ movieDetails, handleRemoveMovie }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleWatchLaterClick = () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));

    if (watchlist && isArray(watchlist)) {
      const index = watchlist.findIndex((el) => el.id === movieDetails.id);

      // if movie is not added
      if (index === -1) {
        watchlist.push(movieDetails);
      } else {
        toastInformation('Already Added to Watchlist');
        return;
      }
    } else {
      watchlist = [movieDetails];
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    toastSuccess('Added to Watchlist');
  };

  return (
    <div className='rounded-lg border flex flex-col justify-between p-2 m-3 hover:shadow-md bg-slate-900'>
      <div className='min-w-216 min-h-323'>
        <img
          src={`${IMAGE_PATH}/w300${movieDetails.poster_path}`}
          className='cursor-pointer text-2xl'
          alt={movieDetails.title}
          loading='lazy'
          onClick={() => navigate(`/movie/${movieDetails.id}`)}
        />
      </div>
      <div className='p-3 text-white'>
        <h5 className='text-lg font-semibold'>{movieDetails?.title}</h5>
        <h6>
          {new Date(movieDetails.release_date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </h6>
      </div>
      <button
        className={`rounded text-white ${
          location.pathname === '/watchlist' ? 'bg-red-500' : 'bg-sky-700'
        } p-4`}
        onClick={
          location.pathname === '/watchlist'
            ? () => handleRemoveMovie(movieDetails?.id)
            : handleWatchLaterClick
        }
      >
        {location.pathname === '/watchlist' ? 'Remove' : 'Watch Later'}
      </button>
    </div>
  );
};

export default MovieCards;
