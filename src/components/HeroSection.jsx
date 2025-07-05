import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import {useNavigate} from 'react-router-dom'
const HeroSection = () => {
    const navigate=useNavigate();
    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36
   bg-[url("https://imgs.search.brave.com/rz-SGGduEBMhb6wTE37GMMbZUMVFL4Nt-SDn8RkfrbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC80LzMv/Ny8zMDY5MDgtMjU2/MHgxMDgwLWRlc2t0/b3AtZHVhbC1tb25p/dG9ycy1ndWFyZGlh/bnMtb2YtdGhlLWdh/bGF4eS1iYWNrZ3Jv/dW5kLmpwZw")] bg-cover bg-center h-screen'>

            <img src={assets.marvelLogo} alt='' className='mt-20 max-h-11 lg:h-11' />

            <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardian <br />of the Galaxy</h1>
            <div>

            </div>

            <div className='flex flex-row items-center gap-4 text-white'>
                <span>Action | Adventure | Sci-Fi</span>
                <div className='flex items-center gap-1'>
                    <CalendarIcon className='w-4.5 h-4.5' /> 2018
                </div>
                <div className='flex items-center gap-1'>
                    <ClockIcon className='mx-w-4.5 h-4.5' />2h 8m
                </div>

            </div>
            <p className='max-w-md text-white'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
            <button onClick={()=>{navigate('/movies')}} className='flex gap-1 items-center px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer '>
                Explore Movies
                <ArrowRight className='mx-w-4.5 h-4.5' />
            </button>

        </div>
    )
}

export default HeroSection