import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();

  const handleLinkClick = () => {
    //scroll to top
    scrollTo(0, 0);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 py-5'>
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
      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
    max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 py-3
    max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-black/10 md:border
 border-gray-300/20 overflow-hidden transition-[width] duration-300 px-9
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
        {
          !user ? (
            <button onClick={openSignIn} className='px-7 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
              Login
            </button>
          ) : (
            // to add component insie profile
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='MyBookings' labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/my-bookings')}/>
              </UserButton.MenuItems>
              </UserButton>
          )
        }

      </div>
    </div>
  )
}

export default Navbar