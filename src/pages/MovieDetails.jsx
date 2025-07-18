import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import { DateSelect } from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

// Helper function to format runtime as 'Xh Ym'
function timeFormat(runtime) {
  if (!runtime || isNaN(runtime)) return '';
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  // Fetch movie details by id
  const getShow = async () => {
    const foundShow = dummyShowsData.find(show => show._id === id);
    setShow({
      movie: foundShow,
      dateTime: dummyDateTimeData
    });

  }
  useEffect(() => {
    getShow();
  }, [id]);

  const navigate = useNavigate();

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_path} alt={show.movie.title} className='max-m:mx-auto rounded-xl h-104 max-w-70 object-cover' />
        <BlurCircle top='-100px' left='-100px' />
        <div className='relative flex flex-col gap-3'>
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance '>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='h-5 w-5 text-primary fill-primary' />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className='text-sm text-gray-400 mt-2 max-w-xl loading-tight'>{show.movie.overview}</p>
          <p className='text-sm text-gray-400 mt-2 max-w-xl loading-tight'>
            {timeFormat(show.movie.runtime)} . {show.movie.genres.map(genre => genre.name).join(', ')} . {show.movie.release_date.split('-')[0]}
          </p>
          <div className=' flex flex-wrap items-center gap-4 mt-4'>
            <button className=' flex items-center gap-2  px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md   font-medium active:scale-95 cursor-pointer'>
              <PlayCircleIcon className='w-5 h-5' />
              Watch Trailer
            </button>
            <a href="#dateSelect" className=' flex items-center  px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium active:scale-95 cursor-pointer'>                Buy Tickets
            </a>

              <button className=' bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                <Heart className='w-5 h-5' />
              </button>
          </div>

        </div>
      </div>

      <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
      <div className='flex flex-wrap gap-4 mt-8 pb-4 mb-10'>
        {show.movie.casts.slice(0,12).map((cast, index) => (
          <div key={index} className='flex flex-col items-center text-center'>
            <img src={cast.profile_path} alt={cast.name} className='h-20 md:h-20 aspect-square rounded-full object-cover mb-2' />
            <p className='text-xs font-medium mt-3  text-gray-300'>{cast.name}</p>
          </div>
        ))}
      </div>
      <DateSelect dateTime={show.dateTime} id={id} />
      <p className='text-lg font-medium mt-20 mb-20'>You May Also Like</p>
      <div className='flex flex-wrap gap-8 max-sm:justify-center '>
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-20'>
        <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
          className='px-10 items-center justify-center py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium mb-10 cursor-pointer'>
          Show More
        </button>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen text-gray-300'>
    <Loading />
    </div>
  );
}

export default MovieDetails;