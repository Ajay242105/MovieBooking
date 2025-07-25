import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, StarIcon } from 'lucide-react';
import VoteCountFormat from '../../components/VoteCountFormat';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [dataTimeSelection, setDataTimeSelection] = useState(null);
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
              {selectedMovie=== movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center h-6 w-6 rounded-full bg-primary'>
                  <CheckIcon className='w-6 h-6' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='max-w-4xl mt-6 bg-black'>
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
        <div>
          <label className='block text-sm font-medium mb-1'>Show Date & Time</label>
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Show Price</label>
          <input
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <button
          type="submit"
          className='px-4 py-2 bg-primary text-white rounded hover:bg-primary/80'
        >
          Add Show
        </button>
      </form>
    </div>
    </>
  ) : (
    <Loading />
  );
}

export default AddShows