import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { dummyTrailers } from '../assets/assets';
import { PlayCircle } from 'lucide-react';

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[1] || dummyTrailers[0]);
  

  // Debug log to check currentTrailer and its videoUrl
  console.log('currentTrailer', currentTrailer);
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>

      <div className='relative mt-6 aspect-video max-w-4xl mx-auto'>
        {currentTrailer && currentTrailer.videoUrl ? (
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls
            width="100%"
            height="100%"
            playing={true}
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full text-gray-400 bg-black rounded-lg'>
            No trailer available
          </div>
        )}
      </div>

      <div className='flex flex-wrap gap-4 justify-center mt-10'>
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrailer(trailer)}
            className='relative w-40 h-24 cursor-pointer hover:opacity-80 hover:-translate-y-1 transition duration-300'
          >
            <img
              src={trailer.image}
              alt="trailer thumbnail"
              className='rounded-lg w-full h-full object-cover brightness-75'
            />
            <PlayCircle
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 text-white transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
