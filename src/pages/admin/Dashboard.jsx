// DateTimeFormat component for consistent date/time display

import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { ChartLineIcon, CircleDollarSignIcon, Currency, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import { dummyDashboardData } from '../../assets/assets';
import BlurCircle from '../../components/BlurCircle';
import DateTimeFormat from '../../components/DateTimeFormat';

const Dashboard = () => {
  const currency=import.meta.env.VITE_CURRENCY || "₹";
  const [dashboardData, setDashboardData] = useState(
    {
      totalBookings: 0,
      totalRevenue: 0,
      totalUser: 0,
      activeShows: [],
    }
  );
  console.log("Dashboard Data:", dummyDashboardData);
  const [loading, setLoading] = useState(true)
  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || 0,
      icon: ChartLineIcon
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue || 0,
      icon: CircleDollarSignIcon
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || 0,
      icon: PlayCircleIcon
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || 0,
      icon: UserIcon
    },
  ]
  // Simulating data fetching
const fetchDashboardData = async () => {
  setDashboardData(dummyDashboardData);
  setLoading(false);
}
useEffect(() => {
  fetchDashboardData();
}, []);

  return !loading ? (
    <>
    <Title text1="Admin" text2="Dashboard"/>
    <div className='relative flex flex-wrap gap-4 mt-6'>
      <BlurCircle top='-100px' left='0' />
      <div className='flex flex-wrap gap-4 w-full'>
        {dashboardCards.map((card, index) => (
          <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl'>
            <div>
              <h1 className='text-sm '>{card.title}</h1>
              <p className='text-xl font-medium mt-1'>{card.value}</p>
            </div>
            <card.icon className='w-8 h-8' />
          </div>
        ))}
      </div>
    </div>

    <p className='mt-10  text-lg font-medium'>Active Shows: {dashboardData.activeShows.length}</p>
<div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
      <BlurCircle top='100px' left='-10%' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
        {dashboardData.activeShows.map((show) => (
         <div key={show.id} className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 shadow-lg transition-transform duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl'>
           <img src={show.movie.poster_path} alt={show.movie.title} className='h-60 w-full object-cover' />
         <p className='font-medium p-2 '>
           {show.movie.title}
         </p>
         <div className='flex items-center justify-between px-2'>
            <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
            <p className='flex items-center gap-1 text-sm text-gray-300 mt-1 pr-1'>
              <StarIcon className='w-4 h-4 text-primary fill-primary' />
              {show.movie.vote_average.toFixed(1)}
            </p>
          </div>
          <p className='px-2 pt-2 text-sm text-gray-300'>
            <DateTimeFormat dateString={show.showDateTime} />
          </p>
        </div>
        ))}
      </div>
</div>

    </>

  ) : (
    <Loading/>

  )
}

export default Dashboard
   