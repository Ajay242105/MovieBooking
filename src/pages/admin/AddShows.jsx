import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, StarIcon } from 'lucide-react';
import VoteCountFormat from '../../components/VoteCountFormat';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [dateTimeSelections, setDateTimeSelections] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movieId) => {
    setSelectedMovie(movieId);
  };

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput || !selectedMovie) return;

    const [date, time] = dateTimeInput.split('T');
    if (!date || !time) return;

    setDateTimeSelections(prev => {
      const movieSelections = prev[selectedMovie] || {};
      const times = movieSelections[date] || [];

      if (!times.includes(time)) {
        return {
          ...prev,
          [selectedMovie]: {
            ...movieSelections,
            [date]: [...times, time]
          }
        };
      }
      return prev;
    });

    setDateTimeInput("");
  };

  const handleRemoveTime = (movieId, date, time) => {
    setDateTimeSelections(prev => {
      const movieSelections = prev[movieId] || {};
      const filteredTimes = (movieSelections[date] || []).filter(t => t !== time);

      if (filteredTimes.length === 0) {
        const { [date]: _, ...restDates } = movieSelections;
        if (Object.keys(restDates).length === 0) {
          const { [movieId]: __, ...restMovies } = prev;
          return restMovies;
        }
        return {
          ...prev,
          [movieId]: restDates
        };
      }

      return {
        ...prev,
        [movieId]: {
          ...movieSelections,
          [date]: filteredTimes
        }
      };
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!selectedMovie || !showPrice || Object.keys(dateTimeSelections[selectedMovie] || {}).length === 0) {
    alert("Please select a movie, set price, and add at least one show time");
    return;
  }

  const matchedMovie = nowPlayingMovies.find(m => String(m.id) === String(selectedMovie));

  const newShow = {
    movie: matchedMovie,
    showTimes: dateTimeSelections[selectedMovie],
    showPrice: parseFloat(showPrice), // ✅ force number
    occupiedSeats: {}
  };

  const existingShows = JSON.parse(localStorage.getItem("shows")) || [];
  localStorage.setItem("shows", JSON.stringify([...existingShows, newShow]));

  alert("Show added!");
};

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
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
              <p className='text-md text-gray-300 font-bold truncate'>{movie.title}</p>
              <p className='text-sm text-gray-500'>{movie.tagline}</p>
              <p className='text-sm text-gray-500'>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
        <div>
          <label className='block text-sm font-medium mb-2'>Select Movie</label>
          <select
            className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
            value={selectedMovie || ""}
            onChange={(e) => setSelectedMovie(e.target.value || null)}
          >
            <option value="">Select a movie</option>
            {nowPlayingMovies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Show Price</label>
          <div className='inline-flex items-center gap-2 border border-gray-300 rounded-md mb-2'>
            <p className='text-sm text-gray-400 ml-3'>{currency}</p>
            <input
              min={0}
              type="number"
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder='Enter show price'
              className='outline-none p-2 bg-transparent w-full'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Show Date & Time</label>
          <div className='inline-flex items-center gap-2 border border-gray-300 rounded-md mb-2'>
            <input
              type="datetime-local"
              value={dateTimeInput}
              onChange={(e) => setDateTimeInput(e.target.value)}
              className='outline-none p-2 bg-transparent'
            />
            <button 
              type="button"
              onClick={handleDateTimeAdd} 
              className='bg-primary/80 text-white px-3 py-3 text-sm rounded-md hover:bg-primary cursor-pointer'
            >
              Add Time
            </button>
          </div>
        </div>

        <div className='mt-4'>
          {selectedMovie && dateTimeSelections[selectedMovie] && Object.keys(dateTimeSelections[selectedMovie]).length > 0 && (
            <div className='mt-6'>
              <h2 className='text-lg font-medium mb-2'>Selected Date & Times</h2>
              <ul>
                {Object.entries(dateTimeSelections[selectedMovie]).map(([date, times]) => (
                  <li key={date} className='mb-2'>
                    <div className='font-medium'>{date}</div>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                      {times.map((time, index) => (
                        <div key={index} className='flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md px-3 py-1'>
                          <span>{time}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTime(selectedMovie, date, time)}
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
};

export default AddShows;
