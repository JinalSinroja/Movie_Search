import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../api/index';
import { IMAGE_PATH } from '../utils/constants';

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    if (id) {
      getMovieDetails();
    }
  }, [id]);

  const getMovieDetails = () => {
    service
      .getMovieById(id)
      .then((res) => {
        console.log('res', res.data);
        setMovieData(res?.data);
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <div className='bg-sky-100 h-screen flex flex-col items-center justify-center'>
      <div className='container flex justify-end mx-11 w-full'>
        {' '}
        <button className='bg-slate-900 px-11 py-4 mb-3 text-white rounded-xl' onClick={() => navigate('/')}>
          Back
        </button>
      </div>
      <div className='container flex bg-slate-900 mx-auto p-7 rounded-2xl'>
        <div className='w-[30%]'>
          <img
            src={`${IMAGE_PATH}/w500${movieData?.poster_path}`}
            className='cursor-pointer text-2xl'
            alt={movieData?.title}
          />
        </div>
        <div className='w-[70%] text-white ml-5 text-lg flex flex-col justify-between'>
          <div className='flex items-center'>
            <h6 className='text-[4rem]'>{movieData?.title}</h6>
            <span className='rounded-2xl max-h-12 mt-4 mx-5 bg-white text-black p-3'>
              {movieData?.status}
            </span>
          </div>
          <div>
            <h6>Overview :</h6>
            <p>{movieData?.overview}</p>
          </div>
          <div>
            <h6 className='my-3'>Languages</h6>
            {movieData?.spoken_languages?.map((el) => (
              <span className='p-2 border' key={el?.name}>
                {el?.name}
              </span>
            ))}
          </div>
          <div className='flex mt-5'>
            <span className='my-3'>Released At:</span>
            <span className='my-3 mx-5'>
              {new Date(movieData?.release_date).toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
