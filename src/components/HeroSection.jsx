import React from 'react'
import { assets } from '../assets/assets'
const HeroSection = () => {
    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36
   bg-[url("bgImage.png")] bg-cover bg-center h-screen'>
           
            <img src={assets.marvelLogo} alt='' className='mt-20 max-h-11 lg:h-11' />

            <h1 className=''>Guardian <br />of the Galaxy</h1>
            <div>

            </div>
            <span>Action | Adventure | Sci-Fi</span>


        </div>
    )
}

export default HeroSection