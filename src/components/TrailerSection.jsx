import React, { useState } from 'react';
import BlurCircle from './BlurCircle';
import ReactPlayer from 'react-player';
import { dummyTrailers } from '../assets/assets';

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[1]);

  // Optional fallback if no trailer
  if (!currentTrailer) {
    return <div className='text-white text-center py-20'>No trailers available</div>;
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>

      <div className='relative mt-6'>
        <BlurCircle top='-100px' right='-100px' />

        <div className='flex justify-center'>
         <ReactPlayer
  url={currentTrailer.videoUrl}
  controls={true}
  playing={true}
  width='960px'
  height='540px'
  className='mx-auto max-w-full'
/>
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
