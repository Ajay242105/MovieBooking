import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { dummyShowsData } from '../assets/assets';

const FeaturedSection = () => {
    const navigate = useNavigate();
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden '>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' right='-80px' />
                <p className='text-gray-200 font-medium text-lg'>Now Shopping</p>
                <button onClick={() => navigate("/movies")} className='group flex items-center gap-2 text-sm text-gray-200 cursor-pointer'>View all
                    <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5 ' />
                </button>

            </div>
            <div className='flex flex-wrap max-sm:justify-center max-lg:justify-center gap-8 mt-8 justify-center '>
                {dummyShowsData.slice(0,4).map((show)=>(
                <MovieCard key={show.id} movie={show}/>

                ))}
            </div>
            <div className='flex justify-center mt-20'>
                <button onClick={() => { navigate('/movies');scrollTo(0,0) }}
                    className=' px-10  items-center justify-center py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium mb-10 cursor-pointer'>
                    Show More
                </button>
            </div>



        </div>
    )
}

export default FeaturedSection