import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, StarIcon } from 'lucide-react';
import VoteCountFormat from '../../components/VoteCountFormat';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [dataTimeSelection, setDataTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movieId) => {
    setSelectedMovie(movieId);
    setDataTimeSelection(movieId); // Optionally sync with select dropdown
  };
  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);


  }
  useEffect(() => {
    fetchNowPlayingMovies();

  }, []);
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      return ;
    }
    const [date, time] = dateTimeInput.split('T');
    if (!date || !time) {
      return;
    }
    setDataTimeSelection(prev => {
      const times=prev[date] || [];
      if(!times.includes(time)){
        return {
          ...prev,
          [date]: [...times, time]
        };
      }
      return prev;
    });
  }

  const handleRemoveTime = (date, time) => {
    setDataTimeSelection(prev => {
      const filteredTimes = prev[date].filter(t => t !== time);
      if (filteredTimes.length === 0) {
       
        const { [date]: _, ...rest } = prev; // Remove date if no times left
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  }
  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className='mt-10 text-lg font-medium'>Now Playing Movies </p>
      <div className='pb-4'>
        <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-4 justify-start'>
          {nowPlayingMovies.map(movie => (
            <div
              key={movie.id}
              className={`relative w-36 sm:w-40 md:w-48 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}
              onClick={() => handleMovieSelect(movie.id)}
            >
              <div className='relative rounded-lg overflow-hidden'>
                <img
                  src={movie.poster_path}
                  alt=""
                  className='rounded-lg w-full h-60 object-cover brightness-90'
                />
                <div className='flex justify-between p-2'>
                  <p className='flex items-center gap-1 text-gray-400'>
                    <StarIcon className='w-4 h-4 text-primary fill-primary' />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className='text-gray-300'><VoteCountFormat count={movie.vote_count} /> votes</p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center h-6 w-6 rounded-full bg-primary'>
                  <CheckIcon className='w-6 h-6' strokeWidth={2.5} />
                </div>
              )}
              <p className=' text-md text-gray-300 font-bold truncate'>{movie.title}</p>
              <p className=' text-sm text-gray-500'>{movie.tagline}</p>
              <p className=' text-sm text-gray-500'>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 '>

        <label className='block text-sm font-medium mb-2'>Show Price</label>
        <div className='inline-flex items-center gap-2 border border-gray-300 rounded-md mb-2'>
          <p className='text-sm text-gray-400 ml-3'>{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder='Enter show price'
            className='outline-none p-2 '
          />
        </div>

      </div>
      {/* Date and Time Selection */}
      <div>
        <label className='block text-sm font-medium mb-2'>
          Show Date & Time</label>
        <div className='inline-flex items-center gap-2 border border-gray-300 rounded-md mb-2'>
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className='outline-none p-2 '
          />
          <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-3 text-sm rounded-md hover:bg-primary cursor-pointer'>
            Add Time
          </button>
        </div>

      </div>
      {/* display selected date and time */}
      <div className='mt-4'>
        {Object.keys(dataTimeSelection).length > 0 && (
          <div className='mt-6'>
            <h2 className='text-lg font-medium mb-2'>Selected Date & Times</h2>
            <ul>
              {Object.entries(dataTimeSelection).map(([date, times]) => (
                <li key={date} className='mb-2'>
                  <div className='font-medium'>{date}</div>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm">
                    {times.map((time, index) => (
                      <div key={index} className='flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md px-3 py-1'>
                        <span>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <button
                          onClick={() => handleRemoveTime(date, time)}
                          className='text-red-500 hover:text-red-700'
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Select Movie</label>
          <select
            className='w-full p-2 border  rounded bg-primary/10 border-primary'
            onChange={(e) => setDataTimeSelection(e.target.value)}
          >
            <option value="">Select a movie</option>
            {nowPlayingMovies.map((movie) => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
            ))}
          </select>
        </div>


        <button
          type="submit"
          className='px-4 py-2 bg-primary text-white rounded hover:bg-primary/80'
        >
          Add Show
        </button>
      </form>
    </>
  ) : (
    <Loading />
  );
}

export default AddShows