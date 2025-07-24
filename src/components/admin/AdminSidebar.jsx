import React from 'react'
import { assets } from '../../assets/assets'
import { AlignJustify, LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  // to store Admin User details
  const user = {
    name: "Admin",
    lastName: "User",
    imageUrl: assets.profile
  }
  const adminNavLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      name: 'Add Shows',
      path: '/admin/add-shows',
      icon: PlusSquareIcon
    },
    {
      name: 'List Shows',
      path: '/admin/list-shows',
      icon: ListIcon
    },
    {
      name: 'List Bookings',
      path: '/admin/list-bookings',
      icon: ListCollapseIcon
    }
  ]


  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      <img src={user.imageUrl} alt="sidebar" className='w-9 h-9 md:h-14 md:w-14 rounded-full mb-4' />
      <h2 className='text-md mt-2 msx-md:hidden font-semibold'>{`${user.name} ${user.lastName}`}</h2>
      <div className='w-full'>
          {adminNavLinks.map((link, index) => (
            <NavLink key={link.path} end className={({ isActive }) =>`relative flex item-center
             max-md:justify-center gap-2  w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400
              ${isActive && 'bg-primary/15 text-primary group'}`} to={link.path}>
              <link.icon className='w-5 h-5' />
              <span>{link.name}</span>
            </NavLink>
          ))}
      </div>
    </div>
  )
}

export default AdminSidebar