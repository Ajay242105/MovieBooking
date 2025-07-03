import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLinkClick = () => {
    //scroll to top
    scrollTo(0, 0);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 py-5 bg-black/50 backdrop-blur-sm'>
      {/* logo */}
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt='' className='w-36 h-auto' />
      </Link>

      {/* Mobile menu button */}
      <div className='md:hidden flex items-center gap-4'>
        <MenuIcon 
          className={`w-8 h-8 cursor-pointer transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          onClick={toggleMenu}
        />
      </div>

      {/* Nav links */}
      <div className={`fixed md:static top-0 left-0 w-full md:w-auto h-screen md:h-auto
        bg-black/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none
        flex flex-col md:flex-row items-center justify-center md:justify-normal gap-8
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {isOpen && (
          <XIcon 
            className="md:hidden absolute top-6 right-6 w-8 h-8 cursor-pointer" 
            onClick={toggleMenu} 
          />
        )}
        <Link className='text-lg md:text-base' onClick={handleLinkClick} to='/'>Home</Link>
        <Link className='text-lg md:text-base' onClick={handleLinkClick} to='/movies'>Movies</Link>
        <Link className='text-lg md:text-base' onClick={handleLinkClick} to='/'>Theaters</Link>
        <Link className='text-lg md:text-base' onClick={handleLinkClick} to='/'>Releases</Link>
        <Link className='text-lg md:text-base' onClick={handleLinkClick} to='/favorite'>Favorites</Link>
      </div>
      
      {/* Desktop search and login button */}
      <div className='hidden md:flex items-center gap-8'>
        <SearchIcon 
          className="w-6 h-6 cursor-pointer" 
          onClick={() => console.log('Search clicked')} 
        />
        <button className='px-7 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
          Login
        </button>
      </div>
    </div>
  )
}

export default Navbar