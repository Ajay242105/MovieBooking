import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

const Favorite = () => {
  return dummyShowsData.length > 0  ? (
    <div className='relative my-40 mb-60  px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      <h1 className='text-xl font-semibold my-4'>Your Favorite Movie</h1>
      <div className=' flex flex-row flex-wrap gap-8 max-sm:justify-center'>
        {dummyShowsData.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ): (
    <div className='flex items-center justify-center h-screen text-gray-300'>
      <h1 className='text-2xl font-semibold'>No Favorite Movies Available</h1>
    </div>
  )
}

export default Favorite