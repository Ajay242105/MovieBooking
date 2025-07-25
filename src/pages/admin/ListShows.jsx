import React, { useState, useEffect } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { Table } from 'lucide-react';
import DateTimeFormat from '../../components/DateTimeFormat';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllShows = async () => {
    try {
      setShow([{
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00Z",
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3"
        }
      }])
            setLoading(false);

    } catch (error) {
      console.log("Error fetching shows:", error);
      
    }
    
  }
  useEffect(() => {
    getAllShows();
  }, []);

  

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {show.map((item, idx) => (
              <tr key={idx} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 pl-5'>{item.movie.title}</td>
                <td className='p-2'><DateTimeFormat dateString={item.showDateTime} /></td>
                <td className='p-2'>{Object.keys(item.occupiedSeats).length}</td>
                <td className='p-2'>{currency} {item.showPrice * Object.keys(item.occupiedSeats).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  
  ) : (
    <div>
      <Loading />
    </div>
  );
}

export default ListShows